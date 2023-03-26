import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";

const Quality = ({ _id }) => {
    const { getQuality } = useQualities();
    const { color, name } = getQuality(_id);
    return <span className={"badge m-1 bg-" + color}>{name}</span>;
};
Quality.propTypes = {
    _id: PropTypes.string.isRequired
};

export default Quality;
