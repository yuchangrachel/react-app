import React from "react";

class TextAreaInput extends React.Component {
  constructor() {
    super();
    this.state = {
      submit: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submit: true });
  }

  handleEdit(e) {
    e.preventDefault();
    this.setState({ submit: false });
  }

  topKFrequent(text, k) {
    const map = {};
    const minHeap = new MinHeap();

    for (let char of text) {
      if (!map[char]) map[char] = 0;
      map[char]++;
    }

    for (let [key, value] of Object.entries(map)) {
      if (minHeap.size() < k || minHeap.top()[1] <= value) {
        minHeap.push([key, value]);
      }

      if (minHeap.size() > k) {
        minHeap.pop();
      }
    }

    return minHeap.getResult();
  }

  renderHighlight() {
    if (this._text) {
      let text_container = this._text.value;
      let highlight = this.topKFrequent(text_container, 5);
      if (!highlight) return "";

      highlight = "[" + highlight.join("") + "]";
      const regexp = new RegExp(highlight, "g");

      const matches = text_container.match(regexp);
      if (!matches) return "";

      var parts = text_container.split(
        new RegExp(`${highlight.replace()}`, "g")
      );
      for (let i = 0; i < parts.length; i++) {
        let match = matches[i];
        parts[i] = (
          <React.Fragment key={i}>
            {parts[i]}
            <span className="highlighted">{match}</span>
          </React.Fragment>
        );
      }

      return <div className="highlighter">{parts}</div>;
    }
  }

  renderCounter() {
    if (this._text) {
      console.log(this._text);
      const dic = new Map();
      for (let c of this._text.value) {
        dic.set(c, (dic.get(c) || 0) + 1);
      }
      //dont need to sort, keep origin order,otherwise can use sort
      const newArr = Array.from(dic);
      return (
        <div>
          <div className="submit-box">
            <span className="submit-title">Result</span>
            <div>
              {newArr.map((count) => (
                <div key={Math.random()}>
                  {count[0]}: {count[1]}
                </div>
              ))}
              <p>
                Top Five most Characters are highlighted(Click Edit):{" "}
                {topKFrequent(this._text.value, 5)}
              </p>
            </div>
          </div>
          <button onClick={this.handleEdit}>Edit</button>
        </div>
      );
    }
    return null;
  }

  render() {
    let editStyle = {};
    if (!this.state.submit) editStyle.display = "block";
    else editStyle.display = "none";

    let submitStyle = {};
    if (this.state.submit) submitStyle.display = "block";
    else submitStyle.display = "none";
    return (
      <div>
        <div class="p-8 text-center">
          <h1 class="text-4xl text-blue-400 font-bold">
            Tailwind Count Characters
          </h1>
          <h2 class="text-2xs text-gray-500 font-semibold">-10/20/2021</h2>
        </div>
        <form>
          <div style={editStyle}>
            <textarea
              value={this.state.value}
              ref={(f) => (this._text = f)}
              className="textarea"
            ></textarea>
            <button onClick={this.handleSubmit}>Show Result</button>
          </div>
          <div style={submitStyle}>{this.renderCounter()}</div>
          <div className="render_highlight" style={submitStyle}>
            {this.renderHighlight()}
          </div>
        </form>
      </div>
    );
  }
}

const topKFrequent = function (text, k) {
  const map = {};
  const minHeap = new MinHeap();

  for (let char of text) {
    if (!map[char]) map[char] = 0;
    map[char]++;
  }

  for (let [key, value] of Object.entries(map)) {
    if (minHeap.size() < k || minHeap.top()[1] <= value) {
      minHeap.push([key, value]);
    }

    if (minHeap.size() > k) {
      minHeap.pop();
    }
  }

  return minHeap.getResult();
};

class MinHeap {
  constructor() {
    this.heap = [];
  }

  // [char, freq] descending order
  push(obj) {
    this.heap.push(obj);
    this.heap.sort((objA, objB) => {
      if (objA[1] === objB[1]) {
        return objA[0].localeCompare(objB[0]);
      }
      return objB[1] - objA[1];
    });
  }
  size() {
    return this.heap.length;
  }
  pop() {
    return this.heap.pop();
  }

  top() {
    return this.heap[this.heap.length - 1];
  }

  getResult() {
    const result = [];
    while (this.size() !== 0) {
      result.unshift(this.pop()[0]);
    }
    return result;
  }
}
export default TextAreaInput;
