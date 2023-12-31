import React, { useEffect, useState } from "react";
import "./Form.scss";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getGroupApi, editGroupApi, createGroupApi } from "../api";
import { BsDot } from "react-icons/bs";
import { errorAtom, infoAtom, successAtom } from "../../../app/atoms";
import { useAtom } from "jotai";
import { FormLoader } from "../../../components";

const Form = () => {
  // component helpers
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [loading, setLoading] = useState(false);

  // atoms
  const [infoMsg, setInfoMsg] = useAtom(infoAtom);
  const [success, setSuccess] = useAtom(successAtom);
  const [error, setError] = useAtom(errorAtom);

  // form variables
  const [name, setName] = useState("");
  const [info, setInfo] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);

      try {
        if (groupId) {
          const data = await getGroupApi(groupId, controller);

          setName(data?.name || "");
          setInfo(data?.info || "");
        }

        setLoading(false);
      } catch (e) {
        if (e.response) {
          setTimeout(() => {
            setError("");
          }, 5000);
          setError(e?.response?.data?.error || errorMessage);
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const controller = new AbortController();

    try {
      if (groupId) {
        const message = await editGroupApi({ name, info }, groupId);

        if (message) {
          setTimeout(() => {
            setInfoMsg("");
          }, 5000);
          setInfoMsg(message);
        }
      } else {
        const message = await createGroupApi({ name, info });

        if (message) {
          setTimeout(() => {
            setSuccess("");
          }, 5000);
          setSuccess(message);
        }
      }

      setLoading(false);
    } catch (e) {
      if (e.response) {
        setTimeout(() => {
          setError("");
        }, 5000);
        setError(e?.response?.data?.error || errorMessage);
        setLoading(false);
      }
    }

    controller.abort();
    navigate(-1);
  };

  return (
    <div className="group_form">
      <div className="form_head">
        <div className="head_content">
          <h1 className="list_title">
            {groupId ? "Guruh o`zgartirish" : "Guruh qo`shish"}
          </h1>
          <ul className="head_links">
            <li>
              <NavLink to={`/dashboard`}>Dashboard</NavLink>
            </li>
            <li className="link_spot">
              <BsDot />
            </li>
            <li>
              <NavLink to={`/group/list`}>Guruhlar ro'yxati</NavLink>
            </li>
            <li className="link_spot">
              <BsDot />
            </li>
            <li>
              {groupId ? (
                <NavLink to={`/group/${groupId}/edit`}>
                  Guruhni o'zgartirish
                </NavLink>
              ) : (
                <NavLink to={`/group/new`}>Yangi guruh</NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="form_box">
        <form onSubmit={submitHandler}>
          <div className="input_form">
            <label htmlFor="groupName">Guruh nomi:</label>
            <input
              type="text"
              value={name}
              id="firstName"
              onChange={(e) => setName(e.target.value)}
              placeholder="Guruh nomi"
              disabled={loading}
              maxLength={22}
              required
            />
          </div>
          <div className="input_form">
            <label htmlFor="info">Ma'lumot:</label>
            <textarea
              type="text"
              id="info"
              value={info}
              onChange={(e) => setInfo(e.target.value)}
              placeholder="Ma'lumot"
              disabled={loading}
              maxLength={180}
              rows={5}
            />
          </div>
          <div className="submit_form">
            <input
              disabled={loading}
              type="submit"
              value={groupId ? "O`zgartirish" : "Qo`shish"}
            />
            {loading ? (
              <span>
                <FormLoader />
              </span>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
