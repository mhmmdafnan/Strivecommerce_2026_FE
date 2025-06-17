import { useNavigate } from "react-router-dom";

const PDFViewer = ({ fileUrl }) => {
  const navigate = useNavigate();

  const onClickFunct = () => {
    navigate(fileUrl);
  };

  return (
    <div
      onClick={onClickFunct}
      className="overflow-hidden curso"
      style={{ height: "150px" }}
    >
      <iframe
        src={fileUrl}
        width="100%"
        height="100%"
        title="PDF Viewer"
        style={{ border: "none", maxHeight: "250px", cursor: "pointer" }}
        onClick={onClickFunct}
      />
    </div>
  );
};

export default PDFViewer;
