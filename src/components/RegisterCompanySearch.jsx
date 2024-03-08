import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function RegisterCompanySearch(props) {
  // 체크박스 하나만 선택하도록 하는 함수
  function checkOnlyOne(element) {
    props.setChecked(element.value);
    const checkboxes = document.getElementsByName("checkbox");
    checkboxes.forEach((cb) => {
      cb.checked = false;
    });
    element.checked = true;
  }

  function 회사체크확인함수() {
    // 회사 체크 했는지 확인하는 함수
    if (props.checked == null) {
      alert("회사를 선택해주세요!");
      return;
    } else {
      props.회원가입단계변경(1);
    }
  }

  let [회사검색결과, 회사검색결과변경] = useState([
    "영남대학교",
    "영남회사",
    "영남일보",
    "우리영남",
    "영남",
  ]); // 회사 검색 결과 데이터 저장 state
  return (
    <div>
      {/*회사명 검색창 부분 */}
      <div style={{ position: "relative" }}>
        <input
          className="register-modal-companySearch"
          type="text"
          placeholder="회사 검색 (소속된 회사가 없을 시 없음을 검색해주세요 )"
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="register-modal-searchIcon"
        />
      </div>

      {/*회사명 검색 결과 부분 */}
      <div className="register-modal-searchResult">
        {회사검색결과.map((a, i) => (
          <div className="register-modal-searchResult-name">
            <label for={`checkbox${i}`}>{a}</label>
            <input
              id={`checkbox${i}`}
              type="checkbox"
              className="register-modal-searchResult-checkbox"
              name="checkbox"
              value={a}
              onClick={(e) => checkOnlyOne(e.target)}
            ></input>
          </div>
        ))}
      </div>

      {/* 직무 선택 부분으로 이동 */}
      <button className="register-modal-nextBtn" onClick={회사체크확인함수}>
        다음
      </button>
    </div>
  );
}
