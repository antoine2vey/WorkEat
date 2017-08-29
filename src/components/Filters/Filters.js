import React, { Component } from 'react';
import { dropdown } from '../../images';

class Filters extends Component {
  constructor() {
    super();

    this.state = {
      isListOpen: false,
      chosenItem: '',
    };
  }

  openList() {
    this.setState({
      isListOpen: !this.state.isListOpen,
    });
  }

  selectItem(nameTag) {
    this.setState({
      chosenItem: nameTag,
      isListOpen: !this.state.isListOpen,
    });
  }

  render() {
    const { tags } = this.props;
    const { chosenItem, isListOpen } = this.state;
    return (
      <div className="filters">
        <div className="admin__field-column-1 filters__list-container">
          <div className="material-field has-label">
            <label htmlFor="tag-filter" className="material-field__label">Filtres</label>
            <div className="filters__select" onClick={() => this.openList()}>
              <span className="filters__chosenItem">{chosenItem}</span>
              <img src={dropdown} alt="dropdown" className="filters__dropdownIcon" />
            </div>
            <ul name="tag-filter" id="tag-filter" className={`filters__list ${isListOpen ? ' filters__list--open' : ''}`}>
              { tags.map(tag => (
                <li key={tag._id} className="filters__item" value={tag._id} onClick={() => this.selectItem(tag.name)}>{tag.name}</li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Filters;
