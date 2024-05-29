import axios from "axios";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    axios
      .get<User[]>(`https://jsonplaceholder.typicode.com/xusers`)
      .then((res) => setUsers(res.data))
      .catch((err) => setErr(err.message));
  }, []);

  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      {err.length > 1 && <p className="text-danger">{err}</p>}
    </>
  );
};

export default App;
