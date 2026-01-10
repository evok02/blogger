import ClipLoader from "react-spinners/ClipLoader";

const override = {
    display: "block",
    margin: "100px auto"
}

const Spinner = ({loading}) => {
    return (
        <ClipLoader
        color="blue"
        size={150}
        cssOverride={override}
        loading={loading}
    />);
}

export {Spinner};
