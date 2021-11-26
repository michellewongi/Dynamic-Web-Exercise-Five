import { useNavigate } from "react-router";
import { useEffect } from "react";

export default (to) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(to);
  }, []);

  return null;
};
