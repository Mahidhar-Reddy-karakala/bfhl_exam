const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const FULL_NAME = "mahidhar_reddy_karakala"; // must be lowercase with underscores
const DOB = "24052004"; // ddmmyyyy (no dashes, as per problem statement)
const EMAIL = "mahidharkarakala2405@gmail.com";
const ROLL_NUMBER = "22BIT0342";

function categorizeInput(dataArray) {
  const odds = [];
  const evens = [];
  const letters = [];
  const specials = [];
  let total = 0;

  for (const value of dataArray) {
    const strVal = String(value);

    if (/^\d+$/.test(strVal)) {
      const num = parseInt(strVal, 10);
      if (num % 2 === 0) evens.push(strVal);
      else odds.push(strVal);
      total += num;
    } else if (/^[a-zA-Z]+$/.test(strVal)) {
      letters.push(strVal.toUpperCase());
    } else {
      specials.push(strVal);
    }
  }

  return { odds, evens, letters, specials, total };
}

function buildAltCaps(text) {
  const reversed = [...text].reverse();
  return reversed
    .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
    .join("");
}

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "Input must contain a 'data' array",
      });
    }

    const { odds, evens, letters, specials, total } = categorizeInput(data);
    const concatString = buildAltCaps(letters.join(""));

    res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers: odds,
      even_numbers: evens,
      alphabets: letters,
      special_characters: specials,
      sum: total.toString(),
      concat_string: concatString,
    });
  } catch (err) {
    res.status(500).json({ is_success: false, message: err.message });
  }
});


module.exports = app;


if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running locally on port ${PORT}`);
  });
}
