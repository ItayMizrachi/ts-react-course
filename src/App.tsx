import { useEffect, useRef } from "react";

const App = () => {
  const ref = useRef<HTMLInputElement>(null);

  //after each Render
  useEffect(() => {
    //Side effect
    if (ref.current) ref.current.focus();
  }, []);

  useEffect(() => {
    document.title = "My App";
  });

  return (
    <div>
      <input
        type="text"
        ref={ref}
        className="form-control"
        placeholder="lorem ipsum"
      />
    </div>
  );
};

export default App;
