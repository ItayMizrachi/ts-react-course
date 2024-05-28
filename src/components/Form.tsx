import { FormEvent, useState } from "react";

const Form = () => {
  const [person, setPerson] = useState({
    name: "",
    age: 0,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(person);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          onChange={(e) => setPerson({ ...person, name: e.target.value })}
          placeholder="name"
          id="name"
          type="text"
          className="form-control"
          value={person.name}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          onChange={(e) =>
            setPerson({ ...person, age: parseInt(e.target.value) })
          }
          placeholder="age"
          id="age"
          type="number"
          className="form-control"
          value={person.age}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Form;
