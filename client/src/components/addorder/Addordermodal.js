import React, { useEffect, useState } from "react";
import axios from "axios";
import "./modal.css";
import Testsrow from "./Testsrow";
import Modal from "react-bootstrap/Modal";

const Addordermodal = (props) => {
  const [allTests, setAllTests] = useState([]);
  const [filteredTests, setFilteredTests] = useState([]);

  useEffect(() => {
    const fetchAllTests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/test/getalltests"
        );
        setAllTests(response.data);
        setFilteredTests(response.data);
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
    };

    fetchAllTests();
  }, []); // Empty dependency array ensures that the effect runs only once when the component mounts.

  if (!props.show) {
    return null;
  }

  const testFilter = (e) => {
    const filter = e.target.value.toUpperCase();
    const filtered = allTests.filter(
      (test) =>
        test.testcode.toUpperCase().includes(filter) ||
        test.testname.toUpperCase().includes(filter)
    );
    setFilteredTests(filtered);
  };

  const handleClose = () => {
    props.setShow(false);
  };

  return (
    <Modal
      show={props.show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Select Test</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="tablewrapper">
          <input
            className="form-control col-sm-2"
            autoFocus={true}
            autoComplete="off"
            id="myInput"
            type="text"
            name="searchInput"
            placeholder="Type testcode..."
            onChange={testFilter}
          />
          <table className="testtable table table-borderless">
            <tbody>
              <tr className="tableheader table-success">
                <td className="width-1">Test code</td>
                <td className="width-2">Test name</td>
                <td className="width-1">Action</td>
              </tr>
              <tr>
                <td colSpan="3">
                  <div className="tablebody">
                    <table id="teststable" className="tablecontent">
                      <tbody>
                        {filteredTests.map((test, key) => (
                          <Testsrow
                            key={key}
                            testcode={test.testcode}
                            testlist={props.testlist}
                            setTestsList={props.setTestsList}
                            testname={test.testname}
                            test={test}
                            close={props.close}
                            hemaTests={props.hemaTests}
                            setHemaTests={props.setHemaTests}
                            cmTests={props.cmTests}
                            setCmTests={props.setCmTests}
                            chemTests={props.chemTests}
                            seroTests={props.seroTests}
                            setSeroTests={props.setSeroTests}
                            microTests={props.microTests}
                            setMicroTests={props.setMicroTests}
                            setChemTests={props.setChemTests}
                            setTotalFee={props.setTotalFee}
                            setChemFee={props.setChemFee}
                            totalFee={props.totalFee}
                            chemFee={props.chemFee}
                            setSeroFee={props.setSeroFee}
                            seroFee={props.seroFee}
                            setCmFee={props.setCmFee}
                            cmFee={props.cmFee}
                            setHemaFee={props.setHemaFee}
                            hemaFee={props.hemaFee}
                            totalCost={props.totalCost}
                            setTotalCost={props.setTotalCost}
                          />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default Addordermodal;
