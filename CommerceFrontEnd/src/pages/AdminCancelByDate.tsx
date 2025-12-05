import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import CancelReservationButton from "../components/CancelReservationButton";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../assets/greycommercelogo.png";

const FixedLogoComponent = () => {
  const imageStyle: React.CSSProperties = {
    position: 'fixed', // Keeps it relative to the browser window
    bottom: '0',       // Anchors it to the bottom of the screen
    right: '0',        // Anchors it to the right of the screen
    margin: '20px',    // Adds spacing around the image
    zIndex: 1000,      // Ensures the logo appears on top of other content
    width: '200px',    // Controls the size of the logo
    height: 'auto',    // Maintains the image's aspect ratio
  };

  return (
    <img
      src={logo}
      alt="Commerce Bank Logo"
      style={imageStyle}
    />
  );
};


//define filter object
interface Filter {
  startDate: string;
  endDate: string;
}

//define reservation object
interface Reservation {
  id: number;
  employee: { firstName: string; lastName: string };
  cubicle: { floor: number; roomNumber: string };
  startDate: string;
  endDate: string;
}

function AdminCancelByDate() {
  const navigate = useNavigate();
  //create filters component, an array of objects holding floor and cubicle withn each object
  const [filters, setFilters] = useState<Filter[]>([{ startDate: "", endDate: "" }]);
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
      const startDateEntered = f.startDate !== "";
      const endDateEntered = f.endDate !== "";
      return startDateEntered || endDateEntered;
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
        //make date data types for reservation dates
        var reservationStartDate = new Date(reservation.startDate);
        var reservationEndDate = new Date(reservation.endDate);
        let filterStartDate = new Date(0);
        let filterEndDate = new Date(0);
        //if start date is filled but end date is empty, see if start overlaps with reservation range
        if(f.startDate != '' && f.endDate == ''){
          filterStartDate = new Date(f.startDate);
          if(filterStartDate >= reservationStartDate && filterStartDate <= reservationEndDate){
            return true;
          }
        }
        //if end date is filled but start date is empty, see if that date overlaps with reservation range
        else if(f.endDate != '' && f.startDate == ''){
          filterEndDate = new Date(f.endDate);
          if(filterEndDate >= reservationStartDate && filterEndDate <= reservationEndDate){
            return true;
          }
        }
        //if both are filled, see if that range falls within the reservation range
        else if(f.endDate != '' && f.startDate != ''){
            filterStartDate = new Date(f.startDate);
            filterEndDate = new Date(f.endDate);
            if(filterStartDate <= reservationEndDate && filterEndDate >= reservationStartDate){
                return true;
            }
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
  const handleInputChange = (index: number, field: "startDate" | "endDate", value: string) => {
    //create a copy of the filters array
    const newFilters = [];
    for (let i = 0; i < filters.length; i++) {
      newFilters.push(filters[i]);
    }
    //update the field at the given row/index
    newFilters[index][field] = value;
    //if data is added to the last filter input field, automaticaly addes a new line of floor/cubicle inputs
    if (index === filters.length - 1 && (value !== "")) {
      newFilters.push({ startDate: "", endDate: "" });
    }
    //update the filters
    setFilters(newFilters);
  };

//cancel all button
const cancelAll = async () => {
  navigate("/admincancelreservationbygroup", {
  state: { filteredReservations }
  });
};


  return (
    <div className="container">
      <h3 className="mt-3">Reservations Sorted By Date Reserved</h3>
      <h4>WARNING:</h4>
      <p>The actions you make here affect the reservations of employees. Once an action is made, it CANNOT be undone. Please be mindful.</p>
      {/*Maps over all filters with values tied to react. Typing triggers handleInputChange to update filters*/} 
      {filters.map((filter, index) => (
        <div key={index}>
          {/*e is an event, being a change in the input fields (typed into), and e.target.value is the what was typed into the input*/}
          <input style={{ marginRight: "10px" }} placeholder="Start Date ex. 2025-12-31" value={filter.startDate} onChange={(e) => handleInputChange(index, "startDate", e.target.value)}/>
          <input placeholder="End Date ex. 2025-12-31" value={filter.endDate} onChange={(e) => handleInputChange(index, "endDate", e.target.value)}/>
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
      <FixedLogoComponent />
    </div>
  );
}

export default AdminCancelByDate;