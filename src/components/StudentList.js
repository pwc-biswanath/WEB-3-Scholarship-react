import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import lottery from "../contract/Scholarship";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const TransctionList = () => {
  const [studentsData, setStudentsData] = useState(null);
  async function fetchData() {
    const students = await lottery.methods.getListOfStudents().call();
    setStudentsData(students);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <Row style={{ marginTop: 30 }}>
        <Col>
          <h4>All Transctions</h4>
          <p>List amount transferred to the beneficiaries</p>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Unique No</th>
                <th>Score</th>
                <th>Address</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {studentsData &&
                studentsData?.map((data, index) => {
                  const { name, rollNo, score, StudentAddress, amount } = data;
                  return (
                    <tr>
                      <td>{index + 1}</td>

                      <td>{name}</td>
                      <td>{rollNo}</td>
                      <td>{score}</td>
                      <td>{StudentAddress}</td>
                      <td>{amount / 1000000000000000000} ETH</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};
export default TransctionList;
