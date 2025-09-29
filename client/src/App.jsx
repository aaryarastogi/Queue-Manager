import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import QueueManager from "./pages/QueueManager";
import QueueOptions from "./pages/QueueOptions";
import CreateQueue from "./pages/CreateQueue";
import ViewQueues from "./pages/ViewQueues";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} /> 
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/queues/options" element={<QueueOptions />} />
      <Route path="/queues/create" element={<CreateQueue />} />
      <Route path="/queues" element={<ViewQueues />} />
      <Route path="/dashboard/:queueId" element={<Dashboard />} />
      <Route path="/queue/:queueId" element={<QueueManager />} />
    </Routes>
  );
}

export default App;