import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Equal, Plus } from "lucide-react";
import backend_url from "../config";
import { motion } from "framer-motion";

function SortableItem({ token, cancelToken }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: token._id.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="bg-white p-4 border border-[#e5e7eb] rounded-xl shadow-md flex justify-between items-center transition hover:shadow-lg"
    >
      <div
        {...attributes}
        {...listeners}
        className="flex-1 cursor-grab"
      >
        <span className="font-semibold text-gray-800">
          {token.position} – {token.customerName}
        </span>
      </div>
      <div className="space-x-4 flex items-center">
        <span
          className={`ml-2 text-md font-semibold capitalize ${
            token.status === "cancelled"
              ? "text-red-600"
              : token.status === "assigned"
              ? "text-green-500"
              : "text-blue-500"
          }`}
        >
          {token.status}
        </span>

        <button
          onClick={() => cancelToken(token._id)}
          className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-200 cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </li>
  );
}

const QueueManager = () => {
  const { queueId } = useParams();
  const [tokens, setTokens] = useState([]);
  const [newTokenName, setNewTokenName] = useState("");
  const navigate = useNavigate();

  const authHeader = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  const fetchTokens = async () => {
    try {
      const res = await axios.get(
        `${backend_url}/${queueId}`,
        authHeader
      );
      setTokens(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTokens();
  }, [queueId]);

  const addToken = async (e) => {
    e.preventDefault();
    if (!newTokenName.trim()) return;

    try {
      await axios.post(
        `${backend_url}/${queueId}`,
        { customerName: newTokenName },
        authHeader
      );
      setNewTokenName("");
      fetchTokens();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add token");
    }
  };

  const cancelToken = async (tokenId) => {
    try {
      await axios.patch(
        `${backend_url}/${queueId}/${tokenId}/cancel`,
        {},
        authHeader
      );
      fetchTokens();
    } catch (err) {
      console.error(err);
    }
  };

  const assignTopToken = async () => {
    try {
      const tokenToAssign = tokens.find(
        (t) => t.status !== "cancelled" && t.status !== "assigned"
      );

      if (!tokenToAssign) {
        alert("No available token to assign");
        return;
      }

      await axios.post(
        `${backend_url}/${queueId}/assign`,
        { tokenId: tokenToAssign._id },
        authHeader
      );

      fetchTokens();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to assign token");
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = tokens.findIndex((t) => t._id.toString() === active.id);
    const newIndex = tokens.findIndex((t) => t._id.toString() === over.id);

    const reordered = arrayMove(tokens, oldIndex, newIndex);
    setTokens(reordered);

    try {
      await axios.post(
        `${backend_url}/reorder/${queueId}`,
        { tokenIds: reordered.map((t) => t._id) },
        authHeader
      );
    } catch (err) {
      console.error(err);
    }
  };

  const sensors = useSensors(useSensor(PointerSensor));

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-row">
          <button
            onClick={() => navigate('/queues')}
            className="text-[#64748b] hover:text-[#475569] mr-4 cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-[#1a1a1a] mb-2">Manage Queues</h1>
            <p className="text-[#6b7280] text-lg">See token status and adding tokens in the queue.</p>
          </motion.div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-[#14b8a6] hover:bg-[#0f9887] text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 shadow-lg cursor-pointer"
          onClick={assignTopToken}
        >
          <Equal className="w-5 h-5" />
          Assign Top Token
        </motion.button>
      </div>

      <motion.form
        onSubmit={addToken}
        className="flex gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <input
          type="text"
          placeholder="Enter person/token name"
          value={newTokenName}
          onChange={(e) => setNewTokenName(e.target.value)}
          className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
        >
          Add Token
        </motion.button>
      </motion.form>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={tokens.map((t) => t._id.toString())}
          strategy={verticalListSortingStrategy}
        >
          <motion.ul
            className="space-y-3 mt-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 },
              },
            }}
          >
            {tokens.map((token) => (
              <motion.li
                key={token._id.toString()}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              >
                <SortableItem token={token} cancelToken={cancelToken} />
              </motion.li>
            ))}
          </motion.ul>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default QueueManager;