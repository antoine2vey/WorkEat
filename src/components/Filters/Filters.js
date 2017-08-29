import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import { dropdown, closeBlack } from '../../images';

class Filters extends Component {
  constructor() {
    super();

    this.state = {
      isListOpen: false,
      chosenItem: {},
    };
  }

  openList() {
    this.setState({
      isListOpen: !this.state.isListOpen,
    });
  }

  selectItem(tag) {
    this.setState({
      chosenItem: tag,
      isListOpen: !this.state.isListOpen,
    }, () => {
      this.props.filter(tag._id);
    });
  }

  handleClearTag() {
    this.setState({
      chosenItem: {},
    }, () => {
      this.props.clearFilterTag();
    });
  }

  render() {
    const { tags } = this.props;
    const { chosenItem, isListOpen } = this.state;
    return (
      <div className="filters">
        <div className="admin__field-column-1 filters__list-container" style={{ position: 'relative' }}>
          <img 
            src={closeBlack}
            alt="dropdown"
            style={{
              width: 12,
              cursor: 'pointer',
              opacity: isEmpty(chosenItem) ? 0 : 1,
              zIndex: isEmpty(chosenItem) ? 10 : 1,
              position: 'absolute',
              top: 48,
            }} className="filters__dropdownIcon" onClick={() => this.handleClearTag()} />
          <div className="material-field has-label">
            <label htmlFor="tag-filter" className="material-field__label">
              Filtrer sur un tag particulier?
            </label>
            <div className="filters__select" onClick={() => this.openList()}>
              <span style={{marginLeft: 20}} className="filters__chosenItem">{chosenItem.name}</span>
              <img src={dropdown} alt="dropdown" className="filters__dropdownIcon" />
            </div>
            <ul name="tag-filter" id="tag-filter" className={`filters__list ${isListOpen ? ' filters__list--open' : ''}`}>
              { tags.map(tag => (
                <li key={tag._id} className="filters__item" value={tag._id} onClick={() => this.selectItem(tag)}>{tag.name}</li>
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
