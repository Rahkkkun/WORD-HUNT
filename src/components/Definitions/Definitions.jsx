import React from "react";
import "./Definitions.css";

const Definitions = ({ meanings, word, LightTheme, category }) => {
  return (
    <div
      className="meanings"
      style={{
        backgroundColor: LightTheme ? "#f5f5f5" : "#1e1e1e",
        color: LightTheme ? "#000" : "#fff",
      }}
    >
      {word === "" ? (
        <span className="subTitle">Start by typing a word in search</span>
      ) : (
        meanings.map((mean, index) =>
          mean.meanings.map((item) =>
            item.definitions.map((def, i) => (
              <div
                key={`${index}-${i}`}
                className="singleMean"
                style={{
                  backgroundColor: LightTheme ? "#ffffff" : "#2c2c2c",
                  color: LightTheme ? "#2c3e50" : "#f0f0f0",
                }}
              >
                <b>{def.definition}</b>
                <hr
                  style={{
                    backgroundColor: LightTheme ? "#ccc" : "#444",
                    width: "100%",
                  }}
                />
                {def.example && (
                  <span>
                    <b>Example:</b> {def.example}
                  </span>
                )}
                {def.synonyms?.length > 0 && (
                  <span>
                    <b>Synonyms:</b> {def.synonyms.join(", ")}
                  </span>
                )}
              </div>
            ))
          )
        )
      )}
    </div>
  );
};

export default Definitions;
