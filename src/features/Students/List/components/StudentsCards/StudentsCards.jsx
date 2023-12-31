import React from "react";
import { FaUserGraduate } from "react-icons/fa";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { IoWarningOutline } from "react-icons/io5";

const ClientsCards = ({ students, removeStudent }) => {
  const navigate = useNavigate();

  return students?.length ? (
    <div className="list_cards">
      {students.map((student, index) => (
        <Link className="card_link" to={`/student/detail/${student?._id}`}>
          <div className="card" key={index + "-client"}>
            <div className="card_head">
              <div className="card_icon">
                <FaUserGraduate />
              </div>
              <h3>{Object.values(student?.name).join(" ")}</h3>
            </div>
            <div className="card_body">
              <p className="card_text">
                Guruh: <span>{student?.group}</span>
              </p>
              <p className="card_text">
                O'qituvchi:
                <span>{Object.values(student?.teacher || "").join(" ")}</span>
              </p>
              <p className="card_text">
                Tel. raqam: <span>{student?.phone}</span>
              </p>
            </div>
            <div className="card_footer">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/student/${student?._id}/edit`);
                }}
              >
                <AiOutlineEdit />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  removeStudent(
                    student?._id,
                    Object.values(student?.name || "").join(" ")
                  );
                }}
              >
                <AiOutlineDelete />
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  ) : (
    <div className="empty_list">
      <h3>
        <span className="empty_icon">
          <IoWarningOutline />
        </span>
        <p>O'quvchilar mavjud emas</p>
      </h3>
    </div>
  );
};

export default ClientsCards;
