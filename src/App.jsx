import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLanguages, translateText } from "./redux/actions/translateAction";
import Select from "react-select";
import { setAnswer } from "./redux/slices/translateSlice";

const App = () => {
  const dispatch = useDispatch();
  const state = useSelector((store) => store.languageSlice);
  const state2 = useSelector((store) => store.translateSlice);

  const [text, setText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState({
    value: "en",
    label: "English",
  });
  const [targetLanguage, setTargetLanguage] = useState({
    value: "tr",
    label: "Turkish",
  });

  const data = useMemo(
    () =>
      state.languages.map((lang) => ({
        value: lang.code,
        label: lang.name,
      })),
    [state.languages]
  );

  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  const handleSwap = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);

    setText(state2.answer);

    dispatch(setAnswer(text));
  };

  return (
    <div id="main-page">
      <div className="container">
        <h1>Translate App</h1>
        <div className="upper">
          <Select
            value={sourceLanguage}
            onChange={setSourceLanguage}
            className="select"
            options={data}
            isLoading={state.isLoading}
            isDisabled={state.isLoading}
          />
          <button onClick={handleSwap} className="change-button">
            Change
          </button>
          <Select
            value={targetLanguage}
            onChange={setTargetLanguage}
            className="select"
            options={data}
            isLoading={state.isLoading}
            isDisabled={state.isLoading}
          />
        </div>
        <div className="middle">
          <div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>
          <div>
            <textarea disabled value={state2.answer}></textarea>
            {state2.isLoading && (
              <div className="typewriter-wrapper">
                <div className="typewriter">
                  <div className="slide">
                    <i></i>
                  </div>
                  <div className="paper"></div>
                  <div className="keyboard"></div>
                </div>
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() =>
            dispatch(translateText({ text, sourceLanguage, targetLanguage }))
          }
          className="translate-button"
        >
          Translate
        </button>
      </div>
    </div>
  );
};

export default App;
