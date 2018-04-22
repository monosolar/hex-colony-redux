import PropTypes from "prop-types";

const colony = PropTypes.shape({
  colonyID: PropTypes.number,
  ownCells: PropTypes.array,
  name: PropTypes.string,
  color: PropTypes.string,
  speed: PropTypes.number
});

const colonies = PropTypes.arrayOf(colony).isRequired;

export default {
  colonies,
  colony
};
