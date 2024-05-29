import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [err, setErr] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    axios
      .get<User[]>(`https://jsonplaceholder.typicode.com/users`, {
        signal: controller.signal,
      })
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setErr(err.message);
        setLoading(false);
      });
    // .finally(() => {
    //   setLoading(false);
    // }); DOESNT WORK ONLY WITH STRICT MODE
    return () => controller.abort();
  }, []);

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    // in case delete fails , saving original users to display the deleted user again
    setUsers(users.filter((u) => u.id !== user.id));
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${user.id}`)
      .catch((err) => {
        setErr(err.message);
        setUsers(originalUsers); //setting users to the original users on FAIL
      });
  };

  const addUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: "Mosh" };
    setUsers([newUser, ...users]);
    axios
      .post(`https://jsonplaceholder.typicode.com/users`, newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        setErr(err.message);
        setUsers(originalUsers); //setting users to the original users on FAIL
      });
    // .then((res) => setUsers([res.data, ...users]));
  };

  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

    axios
      .patch(
        `https://jsonplaceholder.typicode.com/users/${(user.id, updateUser)}`
      )
      .catch((err) => {
        setErr(err.message);
        setUsers(originalUsers); //setting users to the original users on FAIL
      });
  };

  return (
    <>
      {err.length > 1 && <p className="text-danger">{err}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <button onClick={addUser} className="btn btn-primary mb-3">
        Add
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li
            className="d-flex justify-content-between list-group-item"
            key={user.id}
          >
            {user.name}
            <div>
              <button
                onClick={() => updateUser(user)}
                className="btn btn-outline-secondary me-2"
              >
                Edit
              </button>
              <button
                onClick={() => deleteUser(user)}
                className="btn btn-outline-danger"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
