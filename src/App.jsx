import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import Header from "./components/Header/Header";
import Definitions from "./components/Definitions/Definitions";
import "./App.css";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 50,
  height: 28,
  padding: 0,
  marginLeft: 8,
  "& .MuiSwitch-switchBase": {
    padding: 1,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(22px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#4caf50",
        opacity: 1,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    width: 24,
    height: 24,
  },
  "& .MuiSwitch-track": {
    borderRadius: 28 / 2,
    backgroundColor: "#ccc",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const App = () => {
  const [word, setWord] = useState("");
  const [meanings, setMeanings] = useState([]);
  const [category, setCategory] = useState("en");
  const [LightTheme, setLightTheme] = useState(false);

  const dictionaryApi = async () => {
    try {
      const { data } = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
      );
      setMeanings(data);
    } catch (error) {
      // fallback to English if not already English
      if (category !== "en") {
        try {
          const { data } = await axios.get(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
          );
          setMeanings(data);
        } catch {
          setMeanings([]);
          alert("No definitions found in selected or fallback language.");
        }
      } else {
        setMeanings([]);
        alert("No definitions found for this word.");
      }
    }
  };

  useEffect(() => {
    if (word) dictionaryApi();
  }, [word, category]);

  return (
    <div
      className="App"
      style={{
        minHeight: "100vh",
        backgroundColor: LightTheme ? "#f5f5f5" : "#1e1e1e",
        color: LightTheme ? "#111" : "#fff",
        transition: "all 0.4s ease-in-out",
        fontFamily: "'Inter', sans-serif",
        padding: "2rem 1rem",
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Theme Toggle */}
        <div style={{ alignSelf: "flex-end", marginBottom: "1rem" }}>
          <span style={{ fontSize: "0.95rem", opacity: 0.7 }}>
            {LightTheme ? "Light Mode" : "Dark Mode"}
          </span>
          <IOSSwitch
            checked={LightTheme}
            onChange={() => setLightTheme(!LightTheme)}
          />
        </div>

        {/* Header Input */}
        <Header
          word={word}
          setWord={setWord}
          category={category}
          setCategory={setCategory}
          setMeanings={setMeanings}
          LightTheme={LightTheme}
        />

        {/* Results Display */}
        {meanings.length > 0 && (
          <Definitions
            word={word}
            meanings={meanings}
            category={category}
            LightTheme={LightTheme}
          />
        )}
      </Container>
    </div>
  );
};

export default App;
