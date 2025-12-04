import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import CancelReservationButton from "../components/CancelReservationButton";
import { Button } from "react-bootstrap";

//define filter object
interface Filter {
  floor: string;
  cubicle: string;
}

//define reservation object
interface Reservation {
  id: number;
  employee: { firstName: string; lastName: string };
  cubicle: { floor: number; roomNumber: string };
  startDate: string;
  endDate: string;
}

function AdminCancelByCubicle() {
  //create filters component, an array of objects holding floor and cubicle withn each object
  const [filters, setFilters] = useState<Filter[]>([{ floor: "", cubicle: "" }]);
  //initialize all reservations to hold the initiall full list of reservations
  const [allReservations, setAllReservations] = useState<Reservation[]>([]);
  //initialize filtered reservations to hold the reservations that match the admins given list of floors and or cublicles
  //later used to display the table
  const [filteredReservations, setFilteredReservations] = useState<Reservation[]>([]);

  //get full list of reservations from back end and store it in setAllReservations on page load
  useEffect(() => {
    async function loadReservations() {
      try {
        const response = await axios.get("/api/reservations");
        setAllReservations(response.data);
    } catch (error) {
        console.error(error);
      }
    }
  loadReservations();
  }, []);

  useEffect(() => {
    //check if each filter has anything typed into it
    function filterHasInputCheck(f: Filter) {
      const floorEntered = f.floor !== "";
      const cubicleEntered = f.cubicle !== "";
      return floorEntered || cubicleEntered;
    }
    //create the list of filters, excluding the ones that are empty
    const activeFilters = filters.filter(filterHasInputCheck);
    //if no filters then show whole table
    if (activeFilters.length === 0) {
      setFilteredReservations(allReservations);
      return;
    }
    //function to check if current filter matches a single reservation, later looped through full list of reservations
    function reservationMatchesAnyFilter(reservation: Reservation) {
    //loop through each active filter
      for (var i = 0; i < activeFilters.length; i++) {
        var f = activeFilters[i];
        //check floor match, if left blank returns true to pair with any cubicle on that floor
        var floorMatches =
        f.floor === "" || reservation.cubicle.floor.toString() === f.floor;
        //check cubicle match, if left blank returns true to pair with any floors with that cubicle
        var cubicleMatches =
        f.cubicle === "" || reservation.cubicle.roomNumber === f.cubicle;
        //if floor and or cubicle match (if one was left blank) then it pushes that to filtered array when called later
        if (floorMatches && cubicleMatches) {
          return true;
        }
      }
      //if no filter matched
      return false;
    }

    var filtered = []; 
    //loop through allReservations to see which ones match current filters
    for (var i = 0; i < allReservations.length; i++) {
      var reservation = allReservations[i];
      //if a reservation matches push it to the filtered array
      if (reservationMatchesAnyFilter(reservation)) {
        filtered.push(reservation);
      }
    }
    //update the table to be displayed
    setFilteredReservations(filtered);
  }, [filters, allReservations]);

  //handleInputChange updates the filters when an input field is typed into and creates a new input field when the last one is modified
  const handleInputChange = (index: number, field: "floor" | "cubicle", value: string) => {
    //create a copy of the filters array
    const newFilters = [];
    for (let i = 0; i < filters.length; i++) {
      newFilters.push(filters[i]);
    }
    //update the field at the given row/index
    newFilters[index][field] = value;
    //if data is added to the last filter input field, automaticaly addes a new line of floor/cubicle inputs
    if (index === filters.length - 1 && (value !== "")) {
      newFilters.push({ floor: "", cubicle: "" });
    }
    //update the filters
    setFilters(newFilters);
  };

//cancel all button
const cancelAll = async () => {
  //declare first and last id of the filtered reservation list
  const firstId = filteredReservations[0].id;
  const lastId = filteredReservations[filteredReservations.length - 1].id;
  try {
    //loop through indexes between the first and last id
    for (let id = firstId; id <= lastId; id++) {
      let reservationExists = false;
      //loop through the filteredReservations objects to see if they any match the current possible id
      for (let i = 0; i < filteredReservations.length; i++) {
        if (filteredReservations[i].id === id) {
          reservationExists = true;
          break;
        }
      }
      //if one is found that matches, delete that entry
      if (reservationExists) {
        await axios.delete(`/api/reservations/${id}`);
      }
    }
    alert("Reservations canceled");
    window.location.reload();
  } catch (err) {
    console.error(err);
    alert("Failed to cancel reservation");
  }
};

  return (
    <div className="container">
      <h3 className="mt-3">Reservations By Cubicle</h3>

      {/*Maps over all filters with values tied to react. Typing triggers handleInputChange to update filters*/} 
      {filters.map((filter, index) => (
        <div key={index}>
          {/*e is an event, being a change in the input fields (typed into), and e.target.value is the what was typed into the input*/}
          <input style={{ marginRight: "10px" }} placeholder="Cubicle" value={filter.cubicle} onChange={(e) => handleInputChange(index, "cubicle", e.target.value)}/>
          <input placeholder="Floor" value={filter.floor} onChange={(e) => handleInputChange(index, "floor", e.target.value)}/>
        </div>
      ))}
      <Button style={{ margin: "10px" }} variant="danger" onClick={cancelAll}>Cancel All</Button>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th style={{ display: "none"  }}>ID</th>
            <th>Employee</th>
            <th>Cubicle Number</th>
            <th>Floor</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Cancel Reservations</th>
          </tr>
        </thead>
        <tbody>
          {/*display table mapped to filteredReservations*/}
          {filteredReservations.map((reservation, index) => (
            <tr key={index}>
              <td style={{ display: "none" }}>{reservation.id}</td>
              <td>{reservation.employee.firstName} {reservation.employee.lastName}</td>
              <td>{reservation.cubicle.roomNumber}</td>
              <td>{reservation.cubicle.floor}</td>
              <td>{reservation.startDate}</td>
              <td>{reservation.endDate}</td>
              <td><CancelReservationButton reservationId={reservation.id} /></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default AdminCancelByCubicle;
