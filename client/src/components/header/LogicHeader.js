import { useState, useRef, useCallback } from "react";
import { useLocation } from "react-router";
// redux
import { useSelector, useDispatch } from "react-redux";
import { GetAPIData } from "../../utils/fetchData";
import { authState, notificationsState } from "../../redux/store";
import { logout } from "../../redux/actions/actionAuth";
import { DebounceHook } from "hooks/DebounceHook";
const LogicHeader = () => {
  const notifications = useSelector(notificationsState);
  const location = useLocation().pathname;
  const auth = useSelector(authState);
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isNotifications, setIsNotifications] = useState(false);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchTerm = useRef(null);

  // search any user
  const handleSearch = async (e) => {
    const { value } = e.target;
    const { data } = await GetAPIData(
      `search?username=${value.toLowerCase()}`,
      auth.token
    );
    const getSearchData = data.users;
    setUsers(getSearchData);
    setLoading(false);
  };
  // debounce search
  const { debounceSearch } = DebounceHook(handleSearch, 500);

  // open user menue
  const handleOpenUserMenu = (e) => {
    e.stopPropagation();
    setAnchorElUser(e.currentTarget);
  };
  //close user menu
  const handleCloseUserMenu = () => {
    setAnchorElUser(false);
  };

  // Close search
  const handleCloseSearch = () => {
    setSearch("");
  };

  // Logout
  const handleLogout = () => {
    dispatch(logout());
  };
  return {
    handleOpenUserMenu,
    handleCloseUserMenu,
    setSearch,
    setIsNotifications,
    handleCloseSearch,
    handleLogout,
    loading,
    search,
    searchTerm,
    users,
    anchorElUser,
    location,
    notifications,
    isNotifications,
    debounceSearch,
  };
};

export default LogicHeader;
