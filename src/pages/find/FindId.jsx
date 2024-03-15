import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../../css/find/Find.css";
import TopBar from "../../components/TopBar";
import Check_ID from "../../components/Check_ID";
export default function FindId() {
  const movePage = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [isClickable, setIsClickable] = useState(true);
  const [timer, setTimer] = useState(null);
  const [auth_Number, setauth_Number] = useState("");
  const [email, setemail] = useState("");
  const [is_Auth, set_Is_Auth] = useState(false);
  const [is_Next, set_Is_Next] = useState(false);
  const _auth_Number = "123456";

  const saveAuth = (event) => {
    setauth_Number(event.target.value);
  };

  function authentication() {
    if (auth_Number === _auth_Number) {
      set_Is_Auth(true);
    } else {
      alert("인증번호가 틀렸습니다.");
    }
  }

  function toggleCheck() {
    if (!isClickable) return;

    setIsChecked(true);
    setIsClickable(false);
    setTimer(60);
  }

  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    } else {
      setIsChecked(false);
      setIsClickable(true);
      setTimer(null);
    }
  });

  const goCheck_ID = (event) => {
    if (is_Auth) {
      set_Is_Next(true);
    } else {
      alert("인증을 완료해 주세요.");
    }
  };

  function cancle() {
    movePage("/Login");
  }

  return (
    <div>
      <TopBar />
      {!is_Next ? (
        <>
          <div className="findId_bg">
            <div className="findId_main">
              <p className="findId_title">아이디 찾기</p>
              <hr />
              <p className="find_text">
                아이디를 찾기 위해서 이메일 인증을 진행해주세요
              </p>

              <div className="find_email_top">
                <input
                  type="text"
                  placeholder="Email"
                  className="find_email"
                ></input>
                <button
                  className="find_send_email"
                  onClick={toggleCheck}
                  disabled={!isClickable}
                >
                  {isChecked ? "✔️" : "인증메일 전송"}
                </button>
              </div>
              <div className="find_authentication">
                <div style={{ position: "relative", width: "60%" }}>
                  <input
                    className="find_authentication_number"
                    type="text"
                    placeholder="인증번호"
                    onChange={saveAuth}
                  ></input>
                  <button
                    className="find_authentication_btn"
                    onClick={authentication}
                  >
                    인증
                  </button>
                </div>
                <p className="find_timer">{timer}</p>
              </div>
              <button className="find_cancle" onClick={cancle}>
                취소
              </button>
              <button className="find_next_btn" onClick={goCheck_ID}>
                다음
              </button>
            </div>
          </div>
          )
        </>
      ) : (
        <Check_ID />
      )}
    </div>
  );
}
