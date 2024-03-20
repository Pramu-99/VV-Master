import "../css/UpcomingEvents.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Event from "../assert/img/event.jpg";

function UpcomingEvents() {
  return (
    <div className="Container_1">
      <div className="form_container">
        <div className="left_form_container p-3">
          <h1 style={{textAlign:"center"}}>Appilication Form</h1>

          <form className="event_form">
            <div className="form-group">
              <h2>Up Comming Events</h2>
              <select className="inline-select">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
              </select>
            </div>

            <div className="form-group mt-5">
              <p className="inline-label">I like to contribute as</p>
              <select className="inline-select">
                <option value="Viewer">Viewer</option>
                <option value="Participant">Participant</option>
              </select>
            </div>

            <button className="submit_But mt-5" type="Confirm">
              Confirm
            </button>
          </form>
        </div>
        <div className="right_form_container d-flex ">
          <img src={Event} alt="Event" className="form_img" />
        </div>
      </div>
    </div>
  );
}

export default UpcomingEvents;
