//Stateless Function Component
export const Like = ({ styles, item, onClick }) => {
  return (
    <button className={styles} onClick={() => onClick(item)}>
      <span className="fa-stack">
        <i className="fa fa-circle fa-stack-2x"></i>
        <i className="fa fa-heart fa-stack-1x text-black"></i>
      </span>
    </button>
  );
};

export const Plus = () => {
  return (
    <span className="fa-stack">
      <i className="fa fa-circle fa-stack-2x"></i>
      <i className="fa fa-plus fa-stack-1x fa-inverse"></i>
    </span>
  );
};

export const Minus = () => {
  return (
    <span className="fa-stack">
      <i className="fa fa-circle fa-stack-2x"></i>
      <i className="fa fa-minus fa-stack-1x fa-inverse"></i>
    </span>
  );
};

export const Trash = ({ item, onDelete }) => {
  return (
    <button onClick={() => onDelete(item)} className="btn btn-danger btn-sm">
      <span className="fa-stack">
        <i className="fa fa-circle fa-stack-2x"></i>
        <i className="fa fa-trash fa-stack-1x text-black"></i>
      </span>
    </button>
  );
};
