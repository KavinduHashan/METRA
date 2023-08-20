import React, { useState, useEffect } from "react";
import "./home.css";
import axios from "axios";

import Footer from "../footer/footer";
import HomeNavbar from "../navbar-home/navbar";
import Navbar from "../navbar/navbar";

import CookieConsent from "react-cookie-consent";

const Home = () => {
  // session handelling
  useEffect(() => {
    const updateSessionTimeout = () => {
      // 30 minutes from now
      const thirtyMinutesFromNow = new Date(Date.now() + 1000 * 60 * 30);
      document.cookie = `connect.sid=;expires=${thirtyMinutesFromNow};path=/`;
    };

    updateSessionTimeout();
  }, []);

  // cookies
  const [showCookieConsent, setShowCookieConsent] = useState(false);

  useEffect(() => {
    const hasAcceptedCookie = localStorage.getItem("cookieAccepted");
    if (!hasAcceptedCookie) {
      setShowCookieConsent(true);
    }
  }, []);

  const handleAcceptCookie = () => {
    localStorage.setItem("cookieAccepted", "true");
    setShowCookieConsent(false);
  };

  // const handleDeclineCookie = () => {
  // };

  fetch('http://localhost:4000/set-cookie')
  .then(response => {
    if (response.ok) {
      return response.text();
    } else {
      throw new Error('Failed to set cookie.');
    }
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error); 
  });

  // start
  const [selectedStartValue, setSelectedStartValue] = useState("");
  const options = [
    "Colombo",
    "Galle",
    "Kurunagala",
    "Kaluthara",
    "Jaffna",
    "Kandy",
    "Hatton",
  ];
  const handleSelectChange = (event) => {
    setSelectedStartValue(event.target.value);
  };

  // end
  const [selectedEndValue, setSelectedEndValue] = useState("");
  const endoptions = [
    "Hatton",
    "Kandy",
    "Jaffna",
    "Kaluthara",
    "Kurunagala",
    "Galle",
    "Colombo",
  ];
  const handleEndSelectChange = (event) => {
    setSelectedEndValue(event.target.value);
  };

  const [users, setUsers] = useState([]);

  const [errors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (Object.keys(errors).length === 0) {
      try {
        if (
          selectedStartValue === undefined ||
          selectedStartValue === null ||
          selectedStartValue === ""
        ) {
          alert("Arriving Location is required.");
          return;
        } else if (
          selectedEndValue === undefined ||
          selectedEndValue === null ||
          selectedEndValue === ""
        ) {
          alert("Departure Location is required.");
          return;
        }

        const response = await axios.post(
          `http://localhost:4000/schedules/getSearch`,
          {
            start: selectedStartValue,
            end: selectedEndValue,
          }
        );

        if (response.data.length === 0) {
          // check if no data is found
          alert("There is no any train");
          handleClear();
        } else {
          setUsers(response.data);
        }

        // setUsers(response.data);
      } catch (err) {
        alert(err);
      }
    }
  };

  const handleClear = async (event) => {
    setUsers([]);
  };

  return (
    <div className="main">
      <div>
        {/* <h1>Your App Content</h1> */}
        {showCookieConsent && (
          <CookieConsent
            location="bottom"
            buttonText="Accept"
            declineButtonText="Decline"
            onAccept={handleAcceptCookie}
            // onDecline={handleDeclineCookie}
          >
            This website uses cookies to improve your experience.
          </CookieConsent>
        )}
      </div>

      <Navbar />

      <div className="">
        <HomeNavbar />
      </div>

      <div className="container" id="services">
        <br />
        <br />
        <br />
        <br />
        <br />
        <h1 style={{ textAlign: "center" }}>OUR SERVICES</h1>

        <section className="service-features">
          <div className="service-feature1">
            <h4>Colombo Fort - Galle</h4>
            <p>Intercity & Express trains</p>
            <br />
            <p>
              Available class types : <b>2nd class</b>
            </p>
          </div>
          <div className="service-feature2">
            <h4>Colombo Fort - Kurunagala</h4>
            <p>Intercity & Express trains</p>
            <br />
            <p>
              Available class types : <b>2nd class</b>
            </p>
          </div>
          <div className="service-feature3">
            <h4>Colombo Fort - Kaluthara</h4>
            <p>Intercity & Express trains</p>
            <br />
            <p>
              Available class types : <b>2nd class</b>
            </p>
          </div>
          <div className="service-feature4">
            <h4>Colombo Fort - Jaffna</h4>
            <p>Intercity & Express trains</p>
            <br />
            <p>
              Available class types : <b>2nd class</b>
            </p>
          </div>
          <div className="service-feature5">
            <h4>Colombo Fort - Kandy</h4>
            <p>Intercity & Express trains</p>
            <br />
            <p>
              Available class types : <b>2nd class</b>
            </p>
          </div>
          <div className="service-feature6">
            <h4>Colombo Fort - Badulla</h4>
            <p>Intercity & Express trains</p>
            <br />
            <p>
              Available class types : <b>2nd class</b>
            </p>
          </div>
        </section>
      </div>

      <div className="">
        <section className="hero">
          <div className="hero-content">
            <div className="box">
              <div className="c-content">
                <div className="form-outline mb-4">
                  <h2 id="search-h2" className="text-center">
                    SEARCH TRAIN
                  </h2>
                </div>

                <br />

                <form>
                  <table className="table form-outline mb-4">
                    <tr>
                      <td>
                        <div class="form-outline">
                          {/* <label className="label">name</label> */}
                          <select
                            className="form-control"
                            id="selectedStartValue"
                            value={selectedStartValue}
                            onChange={handleSelectChange}
                          >
                            <option value="" disabled>
                              Arriving Location
                            </option>
                            {options.map((option) => (
                              <option value={option} key={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>
                      <td>
                        <div class="form-outline">
                          {/* <label>nic</label> */}
                          <select
                            className="form-control"
                            id="selectedEndValue"
                            value={selectedEndValue}
                            onChange={handleEndSelectChange}
                          >
                            <option value="" disabled>
                              Departure Location
                            </option>
                            {endoptions.map((endoptions) => (
                              <option value={endoptions} key={endoptions}>
                                {endoptions}
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <div class="form-outline mb-4">
                          <button id="clearbtnHome" onClick={handleClear}>
                            CLEAR
                          </button>
                          &nbsp;&nbsp;
                          <button
                            type="submit"
                            id="searchbtnHome"
                            onClick={handleSubmit}
                          >
                            SEARCH
                          </button>
                        </div>
                      </td>
                    </tr>
                  </table>
                </form>
              </div>
            </div>
          </div>
        </section>

        <div className="search-box ">
          <div className="search">
            <ul>
              {users.map((user) => (
                <li key={user.id} style={{ padding: "10px" }}>
                  <br />
                  <h4 style={{ color: "blue" }}>Searched Result :</h4>
                  <br />
                  Train Name: <b>{user.trainname}</b> <br />
                  Arriving Location : <b>{user.start}</b> <br />
                  Departure Location: <b>{user.end}</b>
                  <br />
                  Date: <b>{user.date}</b>
                  <br />
                  Time: <b>{user.time}</b>
                  <br />
                  <br />
                  Tickect Price: <b>LKR{user.price}</b>
                  <br />
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <a href="/booking">BOOK</a>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* <div className='serach-item'>
        
        <ul>
        
        {users.map((user, count) => (
          <table className='table-control'>
            <tr style={{backgroundColor: 'black', textAlign:"center"}}>
              <th colSpan={2}>
              <h4>Details</h4>
              </th>
              <th>
                <h4>Avaliable Seats</h4>
              </th>
              <th></th>
            </tr>
            <tr>
              <td style={{width: '200px'}}>
              
                <li key={user._id}>
                    {user.name}
                  </li>
                </td>
              <td style={{width: '300px'}}>
                <li key={user._id}>
                    {user.email}     
                                  
                  </li>
              </td>
              <td >
                    <p>50/{count}</p>
              </td>

              <td style={{width: '200px', textAlign: 'center'}}>
              
                <a href='/#'>BOOK</a>
              </td>
            </tr><br />
            
          </table>
          ))}
          </ul>
      </div> */}

        <br />
        <br />
        <div className="container">
          <div className="vision">
            <br />
            <h1 style={{ textAlign: "center" }}>OUR VISION</h1>
            <br />
            <p>
              To create a seamless and convenient online train ticket booking
              system that revolutionizes the way people book and manage their
              train travel, providing a hassle-free and user-friendly
              experience.
            </p>
          </div>
        </div>

        <br />
        <br />
        <div className="container">
          <div className="vision">
            <br />
            <h1 style={{ textAlign: "center" }}>OUR MISSION</h1>
            <br />
            <p>
              Provide a seamless platform for customers to book and manage train
              travel. Ensure accessibility, convenience, efficiency,
              comprehensive services, customer satisfaction. Collaborate with
              stakeholders, prioritize security, privacy, innovation. Be the
              leading online train ticket booking platform, revolutionizing
              travel planning with accessibility, convenience, efficiency, and
              satisfaction.
            </p>
          </div>
        </div>
        <br />
        <br />

        <section className="features">
          <div className="food">
            <h1>Food Order</h1>
            <br />
            <a href="/foodordermain">ORDER NOW</a>
          </div>
          <div className="feature">
            <i className="fas fa-cog"></i>
          </div>
        </section>
        <br />
        <br />
        <br />

        <div className="container">
          <section className="about">
            <div className="about-content">
              <h1 style={{ textAlign: "left" }}>HISTORY</h1>
              <p>
                Railways were introduced in Sri Lanka in 1864 to transport
                coffee from plantations in the hilly district of Kandy to the
                port city of Colombo on its way to Europe and the world market.
                The coffee blight of 1871 destroyed many good crops and coffee
                was replaced by tea. With the development of tea estates in the
                1880s, joint stock companies swallowed up the former individual
                ownership of the coffee era. Under corporate ownership and
                managerial control of companies, the tea production process
                became more complex and the upland hills needed more and more
                railroads. Another 100 miles of railways were built in the
                tea-growing districts to serve the expanding tea estate, to send
                tea to Colombo and to transport labour, machinery, fertiliser,
                rice and foodstuffs to Kandy.
              </p>
              <p>
                Railways were built in the wake of these agricultural
                developments to serve the thriving coconut plantations in the
                western, southwestern and northwestern coastal areas of the
                island and the humid freshwater rubber plantations below the tea
                belt. Then, the need for cheap and safe travel to open up the
                interior of the country led to the expansion of the railroad.
              </p>
              <p>
                An extension of the main road to Kandy was made north of the
                ancient city of Anuradhapura to Kankasanthurai and west to
                Thalaimannar to connect the island with South India by ferry,
                bringing in Indian labor for the tea and rubber plantations.
                Importation of rice and other food items which are not locally
                produced in sufficient quantity. To the east, there was little
                economic justification for laying a line in that direction to
                the dry zone, but it would be strategically worthwhile to lay a
                line to the natural harbor of Trincomalee and connect it to the
                provincial capital of Batticaloa. Known as the Kelani Valley
                Road, these roads were constructed with rails in the narrow
                gauge section as well as the light (21 kg) section to serve the
                rubber plantations east of Colombo.
              </p>
              <p>
                A similar branch line was established from Nanuoye on the main
                road through very difficult terrain to serve the tea plantations
                around Udarata, Nuwara Eliya. About 140 years ago, when economic
                considerations had changed greatly, track alignments were
                defined in this section. Railways reached a high standard with
                speeds of 25 to 40 km/h in the hills and 65 to 80 km/h in the
                low country. Civil engineering criteria were influenced by the
                economic need to minimize cut and fill, allow 2 to 3% gradient,
                and minimize bridge length. As a result, the alignment here is
                winding with very sharp curves.
              </p>
              <p>
                In the early days of the railways, the bulk of the freight was
                carried to the port of Colombo and as the port expanded, rail
                lines were laid to serve every pier.
              </p>
            </div>
          </section>
        </div>
      </div>
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default Home;

// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
// <a href='/booking'>BOOK</a>
// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
