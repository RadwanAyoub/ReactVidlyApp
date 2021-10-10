import React from "react";
import Table from "../Common/Table/Table";
import { Like, Trash } from "../Common/IconHelper";
import { Link } from "react-router-dom";
import auth from "../../Services/UsersService";

const MoviesTable = (props) => {
  const { movies, onLike, onDelete, sortColumn, onSort } = props;
  let deleteColumn,
    like = {};
  const user = auth.getCurrentUser();
  if (user && user.isAdmin) {
    deleteColumn = {
      key: "delete",
      content: (item) => <Trash onDelete={onDelete} item={item._id} />,
    };
    like = {
      key: "like",
      content: (item) => {
        let classes = "btn btn-sm";
        if (item.liked) classes += " btn-outline-primary";
        else classes += " btn-outline-danger";
        return <Like onClick={onLike} item={item} styles={classes} />;
      },
    };
  }
  const moviesColumns = [
    {
      label: "Title",
      key: "title",
      content: (item) => {
        return (
          <Link to={`/movies/${item._id}`} className="clickable text-info">
            {item.title}
          </Link>
        );
      },
    },
    { label: "Genre", key: "genre.name" },
    { label: "In Stock", key: "numberInStock" },
    { label: "Rate", key: "dailyRentalRate" },
    like,
    deleteColumn,
  ];

  return (
    <Table
      columns={moviesColumns}
      items={movies}
      onSort={onSort}
      sortColumn={sortColumn}
    />
  );
};

export default MoviesTable;
