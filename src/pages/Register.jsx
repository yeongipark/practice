import RegisterCompanySearch from "../components/RegisterCompanySearch";
import RegisterMain from "../components/RegisterMain";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
// import RegisterMain from "../components/RegisterMain";
export default function Register() {
  let [checked, setChecked] = useState(null); //

  let [회원가입단계, 회원가입단계변경] = useState(0);
  function backStage() {
    if (회원가입단계 == 1) {
      회원가입단계변경(0);
    }
  }
  return (
    <div className="register-modal-wrap">
      <div className="register-modal-whiteBox">
        {/* 닫기버튼 */}
        <button className="register-modal-close" title="닫기">
          X
        </button>

        {/* 뒤로가기 버튼 */}
        {회원가입단계 === 1 && (
          <button
            className="register-modal-back"
            onClick={() => {
              backStage();
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        )}

        <h2 style={{ marginBottom: "5px" }}>가입하기</h2>
        {/* 회원가입단계 1번(회사선택 부분) */}
        {회원가입단계 == 0 ? (
          <RegisterCompanySearch
            checked={checked}
            setChecked={setChecked}
            회원가입단계변경={회원가입단계변경}
          />
        ) : null}
        {회원가입단계 == 1 ? <RegisterMain /> : null}
      </div>
    </div>
  );
}
