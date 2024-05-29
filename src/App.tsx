import { useEffect, useState } from "react";
import { CanceledError } from "./services/api-client";
import userService, { User } from "./services/user-service";

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [err, setErr] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = userService.getAll<User>();
    request
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
    return () => cancel();
  }, []);

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    // in case delete fails , saving original users to display the deleted user again
    setUsers(users.filter((u) => u.id !== user.id));
    userService.delete(user.id).catch((err) => {
      setErr(err.message);
      setUsers(originalUsers); //setting users to the original users on FAIL
    });
  };

  const addUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: "Mosh" };
    setUsers([newUser, ...users]);
    userService
      .create(newUser)
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

    userService.update(updatedUser).catch((err) => {
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
