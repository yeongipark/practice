/*eslint-disable*/
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

//회사 선택
function RegisterCompanySearch(props) {
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

//직무 선택
function RegisterJobSelect(props) {
  function btnClick() {
    if (props.직무 == null) {
      alert("직무를 선택해주세요");
      return;
    } else {
      props.회원가입단계변경(2);
    }
  }
  function 직무변경함수(e) {
    props.직무변경(e.target.value);
  }
  return (
    <div>
      <select
        name="job"
        id="jobs"
        className="register-job-select-select"
        onChange={(e) => {
          직무변경함수(e);
        }}
      >
        <option value="" selected disabled hidden>
          직무를 선택해주세요
        </option>
        <option value="부장">부장</option>
        <option value="대리">대리</option>
        <option value="경영">경영</option>
        <option value="인사">인사</option>
      </select>
      <button className="register-job-select-select-nextBtn" onClick={btnClick}>
        다음
      </button>
    </div>
  );
}

//개인 정보 선택
function RegisterMain(props) {
  // 해당 input이 한번이라도 클릭이 되었는지 확인하는 state
  const [focusArr, setFocusArr] = useState({
    firstName: 0,
    secondName: 0,
    id: 0,
    pwd: 0,
    pwdCheck: 0,
    email: 0,
    emailCheck: 0,
  });

  const [회원정보, 회원정보변경] = useState({
    firstName: "",
    secondName: "",
    id: "",
    pwd: "",
    pwdCheck: "",
    email: "",
    emailCheck: "",
  });

  //에러 메시지랑 테두리 변경할 경우 체크할 함수
  function checkError(name) {
    if (focusArr[name] == 1 && 회원정보[name] == "") {
      return true;
    } else {
      return false;
    }
  }

  //input창 변경시 state 변경함수
  function changeInfo(e, name) {
    let obj = { ...회원정보 };
    obj[name] = e.target.value;
    회원정보변경(obj);
  }

  const input클릭확인 = (name) => {
    if (focusArr[name] == 0) {
      let obj = { ...focusArr };
      obj[name] = 1;
      setFocusArr(obj);
    }
  };

  // 생년월일 저장 state
  const [selectedDate, setSelectedDate] = useState({
    year: null,
    month: null,
    day: null,
  });

  // 년도 선택 옵션 생성 (1900년부터 현재년도까지)
  const yearOptions = [];
  const currentYear = new Date().getFullYear();
  for (let year = 1950; year <= currentYear; year++) {
    yearOptions.push(
      <option key={year} value={year}>
        {year}
      </option>
    );
  }

  // 월 선택 옵션 생성 (1월부터 12월까지)
  const monthOptions = [];
  for (let month = 1; month <= 12; month++) {
    monthOptions.push(
      <option key={month} value={month}>
        {month}
      </option>
    );
  }

  // 일 선택 옵션 생성 (1일부터 31일까지)
  const dayOptions = [];
  for (let day = 1; day <= 31; day++) {
    dayOptions.push(
      <option key={day} value={day}>
        {day}
      </option>
    );
  }

  return (
    <div className="registerMain">
      {/* 이름 입력 */}
      <div className="registerMain-name">
        <div className="registerMain-name-first">
          <input
            type="text"
            placeholder="성"
            onFocus={() => {
              input클릭확인("firstName");
            }}
            className={
              focusArr["firstName"] == 1 && 회원정보["firstName"] == ""
                ? "register-red"
                : ""
            }
            onChange={(e) => {
              changeInfo(e, "firstName");
            }}
          />
          {/* input창 포커스되고 성 입력 안했을때  */}
          {checkError("firstName") ? <p>성을 입력해주세요</p> : null}
        </div>
        <div className="registerMain-name-second">
          <input
            type="text"
            placeholder="이름"
            onFocus={() => {
              input클릭확인("secondName");
            }}
            onChange={(e) => {
              changeInfo(e, "secondName");
            }}
            className={
              focusArr["secondName"] == 1 && 회원정보["secondName"] == ""
                ? "register-red"
                : null
            }
          />
          {checkError("secondName") ? <p>이름을 입력해주세요</p> : null}
        </div>
      </div>
      <div style={{ clear: "both" }}></div>

      {/* 아이디 입력 */}
      <div className="registerMain-id">
        <input
          type="text"
          placeholder="아이디"
          onChange={(e) => {
            changeInfo(e, "id");
          }}
          onFocus={() => {
            input클릭확인("id");
          }}
          className={
            focusArr["id"] == 1 && 회원정보["id"].length <= 5
              ? "register-red"
              : null
          }
        />
        {focusArr["id"] == 1 && 회원정보["id"].length <= 5 ? (
          <p>6글자 이상 입력해주세요</p>
        ) : null}
      </div>

      {/* 비밀번호 입력 */}
      <div className="registerMain-pwd">
        <div className="registerMain-name-first register-pwd">
          <input
            type="text"
            placeholder="비밀번호"
            onChange={(e) => {
              changeInfo(e, "pwd");
            }}
            onFocus={() => {
              input클릭확인("pwd");
            }}
            className={
              focusArr["pwd"] === 1 &&
              !/^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z]).{6,}$/.test(
                회원정보["pwd"]
              )
                ? "register-red"
                : null
            }
          />
          {focusArr["pwd"] == 1 &&
          !/^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z]).{6,}$/.test(
            회원정보["pwd"]
          ) ? (
            <p>특수문자, 대문자 포함 6글자 이상 입력해주세요</p>
          ) : null}
        </div>
        <div className="registerMain-name-second">
          <input
            type="text"
            placeholder="비밀번호 확인"
            onChange={(e) => {
              changeInfo(e, "pwdCheck");
            }}
            onFocus={() => {
              input클릭확인("pwdCheck");
            }}
            className={
              focusArr["pwdCheck"] === 1 ||
              회원정보["pwdCheck"] != 회원정보["pwd"]
                ? "register-red"
                : null
            }
          />
          {focusArr["pwdCheck"] === 1 ||
          회원정보["pwdCheck"] != 회원정보["pwd"] ? (
            <p>비밀번호가 일치하지않습니다</p>
          ) : null}
        </div>
      </div>
      <div style={{ clear: "both" }}></div>

      {/* 이메일 입력 */}
      <div className="registerMain-email">
        <div style={{ height: "59px" }}>
          <input
            type="email"
            onChange={(e) => {
              changeInfo(e, "email");
            }}
            onFocus={() => {
              input클릭확인("email");
            }}
            placeholder="이메일"
            className={
              focusArr["email"] === 1 &&
              !/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}/.test(
                회원정보["email"]
              )
                ? "register-red"
                : null
            }
          />
          {focusArr["email"] === 1 &&
          !/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}/.test(
            회원정보["email"]
          ) ? (
            <p>올바른 이메일 주소를 입력해주세요</p>
          ) : null}
        </div>

        {/* 인증번호 확인 */}
        <input
          type="number"
          placeholder="인증번호"
          className={
            focusArr["emailCheck"] === 1 && 회원정보("emailCheck").length <= 3
              ? "register-red"
              : null
          }
          disabled
        />
        {focusArr["emailCheck"] === 1 && 회원정보("emailCheck").length <= 3 ? (
          <p>인증번호를 입력해주세요</p>
        ) : null}
      </div>

      {/* 생년월일 입력 */}
      <div className="registerMain-birthday">
        <div>
          {/* year */}
          <select
            value={selectedDate.year}
            onChange={(e) =>
              setSelectedDate({ ...selectedDate, year: e.target.value })
            }
          >
            <option value="" disabled hidden selected>
              년도 선택
            </option>
            {yearOptions}
          </select>
        </div>

        {/* month */}
        <div>
          <select
            value={selectedDate.month}
            onChange={(e) =>
              setSelectedDate({ ...selectedDate, month: e.target.value })
            }
          >
            <option value="" disabled hidden selected>
              월 선택
            </option>
            {monthOptions}
          </select>
        </div>

        {/* day */}
        <div>
          <select
            value={selectedDate.day}
            onChange={(e) =>
              setSelectedDate({ ...selectedDate, day: e.target.value })
            }
          >
            <option value="" disabled hidden selected>
              일 선택
            </option>
            {dayOptions}
          </select>
        </div>
      </div>

      <button className="registerMain-nextBtn">완료</button>
    </div>
  );
}

function Register() {
  let [checked, setChecked] = useState(null); //선택한 회사 저장 변수
  let [직무, 직무변경] = useState(null);
  let [회원가입단계, 회원가입단계변경] = useState(0);
  return (
    <div className="register-modal-wrap">
      <div className="register-modal-whiteBox">
        {/* 닫기버튼 */}
        <button className="register-modal-close" title="닫기">
          X
        </button>
        <h2 style={{ marginBottom: "5px" }}>가입하기</h2>
        {/* 회원가입단계 1번(회사선택 부분) */}
        {회원가입단계 == 0 ? (
          <RegisterCompanySearch
            checked={checked}
            setChecked={setChecked}
            회원가입단계변경={회원가입단계변경}
          />
        ) : null}
        {회원가입단계 == 1 ? (
          <RegisterJobSelect
            직무={직무}
            직무변경={직무변경}
            회원가입단계변경={회원가입단계변경}
          />
        ) : null}
        {회원가입단계 == 2 ? <RegisterMain /> : null}
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Register />
    </div>
  );
}

export default App;
