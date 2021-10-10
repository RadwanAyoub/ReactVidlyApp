import React, { Component } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import { BootstrapInput } from "../Utils/Common";

class SelectList extends Component {
  state = {
    value: "",
  };

  render() {
    const handleSelectChange = (event) => {
      this.setState({ value: event.target.value });
      this.props.onItemSelect(event.target.value);
    };
    return (
      <div>
        <FormControl className="mb-3">
          <InputLabel htmlFor="genre-select">Genre</InputLabel>
          <NativeSelect
            id="genre-select"
            value={this.state.value}
            onChange={handleSelectChange}
            input={<BootstrapInput />}
          >
            <option aria-label="None" value="" />
            {this.props.items.map((item) => {
              return (
                <option
                  key={item[this.props.keyProperty]}
                  value={item[this.props.valueProperty]}
                >
                  {item.name}
                </option>
              );
            })}
          </NativeSelect>
        </FormControl>
      </div>
    );
  }
}

SelectList.defaultProps = {
  textProperty: "_id",
  valueProperty: "name",
};

export default SelectList;
