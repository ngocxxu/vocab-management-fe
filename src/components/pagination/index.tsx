const Pagination = () => {
  return (
    <div className="join mt-6 flex justify-end">
      <button className="join-item btn btn-sm">«</button>
      <button className="join-item btn btn-sm">‹</button>
      <button className="join-item btn btn-sm bg-gray-700 text-white">1</button>
      <button className="join-item btn btn-sm">2</button>
      <button className="join-item btn btn-sm">3</button>
      <button className="join-item btn btn-sm">4</button>
      <button className="join-item btn btn-sm">5</button>
      <button className="join-item btn btn-sm btn-disabled">...</button>
      <button className="join-item btn btn-sm">100</button>
      <button className="join-item btn btn-sm">›</button>
      <button className="join-item btn btn-sm">»</button>
    </div>
  );
};

export default Pagination;
