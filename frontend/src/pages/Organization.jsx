import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Banner from "../components/Banner";
import "../styles/Organization.css";
import ReactGA4 from "react-ga4";

const Organization = () => {
  const location = useLocation();
  const address = process.env.REACT_APP_BACKEND_ADDRESS;

  const [userId, setUserId] = useState(null);
  const [userNickname, setUserNickname] = useState(null);
  const [userStatus, setUserStatus] = useState(null);

  const checkAccessToken = async (
    setUserId,
    setUserNickname,
    setUserStatus
  ) => {
    const token = localStorage.getItem("token");
    //console.log(token);
    if (!token) return; // 토큰이 없으면 검증하지 않음
    else {
      try {
        const response = await fetch(`${address}/verify`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Bearer 형식으로 토큰 전송
          },
        });

        const result = await response.json();
        console.log(result);

        if (result.success) {
          setUserId(result.user.userId);
          setUserNickname(result.user.userNickname);
          setUserStatus(result.user.userStatus);
        }
      } catch (error) {
        console.error("토큰 검증 중 오류 발생:", error);
        localStorage.removeItem("token");
      }
    }
  };
  useEffect(() => {
    checkAccessToken(setUserId, setUserNickname, setUserStatus);
    ReactGA4.send({
      hitType: "pageview",
      page: location.pathname + location.search,
      title: "Organization",
    });
  }, [location]);

  return (
    <>
      <Banner />
      <div className="container">
        <h1>조직도</h1>
        <div className="org-chart">
          <div className="org-level">
            <div className="org-node president">
              <strong>학회장</strong>
              <span>천성윤</span>
            </div>
            <div className="org-node vice-president">
              <strong>부학회장</strong>
              <span>전서연</span>
            </div>
          </div>

          <div className="org-level departments">
            <div className="org-node department">
              <strong>운영관리부</strong>
              <span>라현아</span>
            </div>
            <div className="org-node department">
              <strong>연구개발부</strong>
              <span>최은비</span>
            </div>
            <div className="org-node department">
              <strong>홍보기획부</strong>
              <span>유아름</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Organization;
