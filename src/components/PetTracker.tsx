import React, { useState, useEffect } from "react";
import axios from "axios";
import MapComponent from "./MapComponent";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Container, Row, Col } from "react-bootstrap";
import "./PetTracker.css";

interface PetLocation {
  id: number;
  lat: number;
  lon: number;
  sendDate: string;
}

const PetTracker: React.FC = () => {
  const [position, setPosition] = useState<[number, number]>([
    4.4874324, -75.7040919,
  ]);
  const [latestPosition, setLatestPosition] = useState<PetLocation | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = "yourUsername";
        const password = "yourPassword";
        const token = btoa(`${username}:${password}`);
        const response = await axios.get<PetLocation[]>(
          "https://api.petwatch.tech/coordinates",
          {
            headers: {
              Authorization: `Basic ${token}`,
            },
          }
        );
        const data = response.data;
        if (data.length > 0) {
          const latestPosition = data[data.length - 1];
          setPosition([latestPosition.lat, latestPosition.lon]);
          setLatestPosition(latestPosition);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 20000); // Fetch data every minute

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col lg={8} xs={12}>
          <MapComponent position={position} latestPosition={latestPosition} />
        </Col>
        <Col
          lg={4}
          xs={12}
          className="d-flex flex-column align-items-center mt-5"
        >
          <h3>Physical Activity Levels</h3>
          <div className="gauge-container">
            <div className="gauge">
              <CircularProgressbar
                value={50}
                text={`${50}%`}
                styles={buildStyles({
                  pathColor: `rgba(62, 152, 199, ${50 / 100})`,
                  textColor: "#3e98c7",
                  trailColor: "#d6d6d6",
                })}
              />
              <p>Low Physical Activity</p>
            </div>
            <div className="gauge">
              <CircularProgressbar
                value={20}
                text={`${20}%`}
                styles={buildStyles({
                  pathColor: `rgba(255, 140, 0, ${20 / 100})`,
                  textColor: "#ff8c00",
                  trailColor: "#d6d6d6",
                })}
              />
              <p>Medium Physical Activity</p>
            </div>
            <div className="gauge">
              <CircularProgressbar
                value={30}
                text={`${30}%`}
                styles={buildStyles({
                  pathColor: `rgba(0, 200, 83, ${30 / 100})`,
                  textColor: "#00c853",
                  trailColor: "#d6d6d6",
                })}
              />
              <p>High Physical Activity</p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PetTracker;
