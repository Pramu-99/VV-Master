import React, { useEffect, useState } from "react";
import axios from "axios";
import UserProfile from "./UserProfile";
import ProgressBar from "react-bootstrap/ProgressBar";
import MemberEventDetails from "./MemberEventDetails";
import UserNavbar from "./UserNavbar";
export default function MemberProgress() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonPopupEvent, setButtonPopupEvent] = useState(false);
  const [averageRate, setAverageRate] = useState(0);
  const [members, setMembers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [partiEvents, setPartiEvents] = useState([]);
  const [memregno, setMemregno] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const membersResponse = await axios.get("http://localhost:8000/posts");
        console.log("Members Response:", membersResponse.data);
        setMembers(membersResponse.data);

        const reviewsResponse = await axios.get("http://localhost:8000/review");
        console.log("Reviews Response:", reviewsResponse.data);
        setReviews(reviewsResponse.data);

        const appliesResponse = await axios.get(
          "http://localhost:8000/applies"
        );
        console.log("Reviews Response:", appliesResponse.data);
        setPartiEvents(appliesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const calculateAverageRateOfCameraman = (regno) => {
    const filteredReviews = reviews.existingPosts
      ? reviews.existingPosts.filter(
          (review) => review.regno === regno && review.role == "Cameraman"
        )
      : [];
    const totalRates = filteredReviews.reduce(
      (accumulator, currentReview) => accumulator + currentReview.rate,
      0
    );
    const averageRate = (totalRates / filteredReviews.length) * 20; // Assuming rate is out of 5
    return isNaN(averageRate) ? 0 : averageRate;
  };

  const calculateAverageRateOfEditor = (regno) => {
    const filteredReviews = reviews.existingPosts
      ? reviews.existingPosts.filter(
          (review) => review.regno === regno && review.role == "Editor"
        )
      : [];
    const totalRates = filteredReviews.reduce(
      (accumulator, currentReview) => accumulator + currentReview.rate,
      0
    );
    const averageRate = (totalRates / filteredReviews.length) * 20; // Assuming rate is out of 5
    return isNaN(averageRate) ? 0 : averageRate;
  };

  const calculateAverageMarksOfCameraman = (regno) => {
    const filteredRows = partiEvents.existingPosts
      ? partiEvents.existingPosts.filter(
          (events) =>
            events.userregno === regno &&
            events.status === true &&
            events.marks !== 0 &&
            events.roleapply == "Cameraman"
        )
      : [];
    console.log(filteredRows);
    const totalMarks = filteredRows.reduce(
      (accumulator, currentMark) => accumulator + currentMark.marks,
      0
    );
    console.log(totalMarks);
    const averageMarks = totalMarks / filteredRows.length;
    return isNaN(averageMarks) ? 0 : averageMarks;
  };

  const calculateAverageMarksOfEditor = (regno) => {
    const filteredRows = partiEvents.existingPosts
      ? partiEvents.existingPosts.filter(
          (events) =>
            events.userregno === regno &&
            events.status === true &&
            events.marks !== 0 &&
            events.roleapply == "Editor"
        )
      : [];
    console.log(filteredRows);
    const totalMarks = filteredRows.reduce(
      (accumulator, currentMark) => accumulator + currentMark.marks,
      0
    );
    console.log(totalMarks);
    const averageMarks = totalMarks / filteredRows.length;
    return isNaN(averageMarks) ? 0 : averageMarks;
  };

  const handleShowReview = (event) => {
    setButtonPopup(true);
    setMemregno(event);
  };
  const handleEventMarks = (event) => {
    setButtonPopupEvent(true);
    setMemregno(event);
  };

  return (
    <div>
      <UserNavbar />
      {members.existingPosts &&
        members.existingPosts.map((mem, index) => (
          <div style={styles.container} key={index}>
            <div style={styles.container1}>
              <div style={styles.memberBox}></div>
              <div style={styles.memberDetails}>
                <ul style={styles.memberDetailsList}>
                  <li>
                    <b>
                      NAME: {mem.fname} {mem.lname}
                    </b>
                  </li>
                  <li>
                    <b>REG NO: {mem.regno}</b>
                  </li>
                  <li>
                    <b>JOIN DATE: {mem.joinDate}</b>
                  </li>
                </ul>
              </div>
              <div style={styles.progressbar}>
                Average Reviews as a Cameraman
                <ProgressBar
                  animated
                  now={calculateAverageRateOfCameraman(mem.regno)}
                  label={`${calculateAverageRateOfCameraman(mem.regno)}%`}
                />
                <br />
                Average Marks as a Cameraman
                <ProgressBar
                  animated
                  now={calculateAverageMarksOfCameraman(mem.regno)}
                  label={`${calculateAverageMarksOfCameraman(mem.regno)}%`}
                />
              </div>

              <div style={styles.progressbar}>
                Average Reviews as a Editor
                <ProgressBar
                  animated
                  now={calculateAverageRateOfEditor(mem.regno)}
                  label={`${calculateAverageRateOfEditor(mem.regno)}%`}
                />
                <br />
                Average Marks as a Editor
                <ProgressBar
                  animated
                  now={calculateAverageMarksOfEditor(mem.regno)}
                  label={`${calculateAverageMarksOfEditor(mem.regno)}%`}
                />
              </div>

              <button
                onClick={(e) => handleShowReview(e.target.value)}
                value={mem.regno}
                style={styles.showreview}
              >
                Show Review
              </button>
              <button
                style={styles.showreview}
                value={mem.regno}
                onClick={(e) => handleEventMarks(e.target.value)}
              >
                Show Event Details
              </button>
              <div>
                <UserProfile
                  trigger={buttonPopup}
                  setTrigger={setButtonPopup}
                  memreg={memregno}
                />
                <MemberEventDetails
                  trigger={buttonPopupEvent}
                  setTrigger={setButtonPopupEvent}
                  memreg={memregno}
                />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    top: "100px",
    bottom: "20px",
    left: "110px",
    right: "110px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
    display: "flex",
    flexDirection: "column",
    marginBottom: "30px",
    width: "80%",
  },
  container1: {
    flex: "2",
    padding: "20px",
    position: "relative",
  },
  memberBox: {
    position: "absolute",
    top: "20px",
    left: "20px",
    width: "125px",
    height: "125px",
    backgroundColor: "#f5f5f5",
    border: "0px solid black",
  },
  memberDetails: {
    marginLeft: "82px",
  },
  memberDetailsList: {
    listStyleType: "none",
    padding: "0",
    marginLeft: "82px",
  },

  showreview: {
    padding: "5px 10px 5px 10px",
    margin: "20px 0px",
    marginRight: "20px",
  },
  progressbar: {
    paddingTop: "50px",
  },
};
