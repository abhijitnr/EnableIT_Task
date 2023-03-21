import { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchUsers(currentPage)
      .then((data) => setUsers(data.users))
      .catch((err) => console.log(err));
  }, [currentPage]);

  const fetchUsers = async (page) => {
    try {
      const response = await fetch(
        `https://give-me-users-forever.vercel.app/api/users/${page * 10}/next`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 0}>
          Previous Page
        </button>
        <button onClick={handleNextPage}>Next Page</button>
      </div>

      <div className="users">
        {users.map((user) => (
          <div key={user.ID} className="user_info">
            <p>
              <span>ID : </span>
              {user.ID}
            </p>
            <p>
              <span>JobTitle :</span>
              {user.JobTitle}
            </p>
            <p>
              <span>EmailAddress :</span>
              {user.EmailAddress}
            </p>
            <p>
              <span>Name :</span>
              {user.FirstNameLastName}
            </p>
            <p>
              <span>Email :</span>
              {user.Email}
            </p>
            <p>
              <span>Phone :</span>
              {user.Phone}
            </p>
            <p>
              <span>Company :</span>
              {user.Company}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Users;
