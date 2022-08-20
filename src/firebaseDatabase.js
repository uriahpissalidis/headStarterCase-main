import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { set, ref, onValue, remove, update } from "firebase/database";
import { uid } from "uid";

const style = {};

const FirebaseDatabase = () => {
  const [name, setName] = useState("");
  const [names, setNames] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUuid, setTempUuid] = useState("");
  const [email, setEmail] = useState("");
  const [timeZone, setTimeZone] = useState("");
  // Dates Below
  const [monday, setMonday] = useState("");
  const [tueday, setTueday] = useState("");
  const [wednesday, setWednesday] = useState("");
  const [thursday, setThursday] = useState("");
  const [friday, setFriday] = useState("");
  const [saturday, setSaturday] = useState("");
  const [sunday, setSunday] = useState("");

  const handleOnChange = (e) => {
    setName(e.target.value);
  };
  const handleOnChange1 = (e) => {
    setEmail(e.target.value);
  };
  const handleOnChange2 = (e) => {
    setTimeZone(e.target.value);
  };
  const handleOnChange3 = (e) => {
    setMonday(e.target.value);
  };
  const handleOnChange4 = (e) => {
    setTueday(e.target.value);
  };
  const handleOnChange5 = (e) => {
    setWednesday(e.target.value);
  };
  const handleOnChange6 = (e) => {
    setThursday(e.target.value);
  };
  const handleOnChange7 = (e) => {
    setFriday(e.target.value);
  };
  const handleOnChange8 = (e) => {
    setSaturday(e.target.value);
  };
  const handleOnChange9 = (e) => {
    setSunday(e.target.value);
  };

  //read
  useEffect(() => {
    onValue(ref(db, `/availability`), (snapshot) => {
      setNames([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).forEach((name) => {
          setNames((oldArray) => [...oldArray, name]);
        });
      }
    });
  }, []);

  //write
  const createTodo = () => {
    const uuid = uid();
    set(ref(db, `/availability/${uuid}`), {
      name,
      uuid,
      complete: false,
      email,
      timeZone,

      monday,
      tueday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
    });
    setName("");
    setEmail("");
    setTimeZone("");
    setMonday("");
    setTueday("");
    setWednesday("");
    setThursday("");
    setFriday("");
    setSaturday("");
    setSunday("");
  };

  // Update
  const handleUpdate = (name) => {
    setIsEdit(true);
    setTempUuid(name.uuid);
    setTimeZone(name.timeZone);
    setMonday(name.monday);
    setTueday(name.tueday);
    setWednesday(name.wednesday);
    setThursday(name.thursday);
    setFriday(name.friday);
    setSaturday(name.saturday);
    setSunday(name.sunday);
  };

  const handleSubmitChange = () => {
    update(ref(db, `/availability/${tempUuid}`), {
      name,
      uuid: tempUuid,
      email,
      timeZone,

      monday,
      tueday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
    });
    setName("");
    setTimeZone("");
    setMonday("");
    setTueday("");
    setWednesday("");
    setThursday("");
    setFriday("");
    setSaturday("");
    setSunday("");
    setIsEdit(false);
  };

  // delete
  const handleDelete = (name) => {
    remove(ref(db, `/availability/${name.uuid}`));
  };

  return (
    <div>
      <hr
        style={{
          background: "blue",
          height: "3px",
        }}
      />
      <title>Availability Tab </title>
      <h1>Availability</h1>
      <form align="justify">
        <div>
          <label>Name: </label>
          <input dotted type="text" onChange={handleOnChange} value={name} />
        </div>

        <div>
          <label>Email: </label>
          <input type="text" onChange={handleOnChange1} value={email} />
        </div>

        <div>
          <label>Time Zone: </label>
          <input type="text" onChange={handleOnChange2} value={timeZone} />
        </div>
        <div>Date</div>
        <div>
          <label>Monday </label>
          <input type="text" onChange={handleOnChange3} value={monday} />
        </div>

        <div>
          <label>Tuesday </label>
          <input type="text" onChange={handleOnChange4} value={tueday} />
        </div>

        <div>
          <label>Wednesday </label>
          <input type="text" onChange={handleOnChange5} value={wednesday} />
        </div>
        <div>
          <label>Thursday </label>
          <input type="text" onChange={handleOnChange6} value={thursday} />
        </div>
        <div>
          <label>Friday </label>
          <input type="text" onChange={handleOnChange7} value={friday} />
        </div>
        <div>
          <label>Saturday </label>
          <input type="text" onChange={handleOnChange8} value={saturday} />
        </div>
        <div>
          <label>Sunday </label>
          <input type="text" onChange={handleOnChange9} value={sunday} />
        </div>
      </form>
      <hr />
      {isEdit ? (
        <>
          <button onClick={handleSubmitChange}>Submit Change</button>
          <button
            onClick={() => {
              setIsEdit(false);
              setName("");
            }}
          >
            X
          </button>
        </>
      ) : (
        <button className="submit-button" onClick={createTodo}>
          Submit Button
        </button>
      )}
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">TimeZone</th>
            <th scope="col">Monday</th>
            <th scope="col">Tuesday</th>
            <th scope="col">Wednesday</th>
            <th scope="col">Thursday</th>
            <th scope="col">Friday</th>
            <th scope="col">Saturday</th>
            <th scope="col">Sunday</th>
          </tr>
        </thead>
        {names.map((name) => (
          <>
            <tr key={name.name}></tr>
            <th>{name.name}</th>
            <td> {name.email}</td>
            <td> {name.timeZone}</td>
            <td> {name.monday}</td>
            <td> {name.tueday}</td>
            <td> {name.wednesday}</td>
            <td> {name.thursday}</td>
            <td> {name.friday}</td>
            <td> {name.saturday}</td>
            <td> {name.sunday}</td>
            <button onClick={() => handleUpdate(name)}>update __</button>
            <button onClick={() => handleDelete(name)}>delete</button>
          </>
        ))}
      </table>
    </div>
  );
};
export default FirebaseDatabase;
