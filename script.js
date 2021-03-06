const container = document.querySelector('.container');
const selectTo = document.querySelector('select.to');
const selectFrom = document.querySelector('select.from');
const result = document.querySelector('.result');
const swapBtn = document.querySelector('.swap-btn');

const input = document.querySelector('input');
const btnExchange = document.querySelector('.btn-exchange');
doLoop();

swapBtn.addEventListener('click', () => {
  const toVal = selectTo.value;
  const fromVal = selectFrom.value;
  selectTo.value = fromVal;
  selectFrom.value = toVal;
})

btnExchange.addEventListener('click', async () => {
  if (input.value && !isNaN(parseInt(input.value))) {
    const arrTo = selectTo.value.split(' ');
    const arrFrom = selectFrom.value.split(' ');
    const selectedCurrTo = arrTo[0];
    const selectedCurrFrom = arrFrom[0];
    arrTo.shift();
    arrFrom.shift();
    const selectedToCountry = arrTo.join(' ');
    const selectedFromCountry = arrFrom.join(' ');
    const data = await getData(exchangeUrl(selectedCurrTo, selectedCurrFrom, input.value));
    if (data.result == 'success') {
      const outputP = document.querySelector('.output p.details');
      outputP.innerHTML = `Exchangin from <span class="spanFrom fw-bold">${selectedFromCountry}</span> to <span class="spanTo fw-bold">${selectedToCountry}</span>`;
      result.innerHTML = data.conversion_result + ' ' + data.target_code;
    }
  }
});


const exchangeUrl = (curr1, curr2, amount) => `https://v6.exchangerate-api.com/v6/75fe1a1155ffd487694cab79/pair/${curr2}/${curr1}/${amount}`;
const detailUrl = (country) => `https://restcountries.com/v3.1/name/${country}`;

function getData(url) {
  return fetch(url).then(res => res.json()).then(data => data).catch(err => err);
}

async function doLoop() {
  const countries = await getData('https://restcountries.com/v3.1/all');
  for (const c of countries) {
    if (c !== 'Timeout') {
      if (c.currencies) {
        const optionTo = document.createElement('option');
        const optionFrom = document.createElement('option');

        optionTo.innerHTML = c.flag + c.name.common;
        optionTo.setAttribute('value', Object.keys(c.currencies)[0] + ' ' + c.name.common);

        optionFrom.innerHTML = c.flag + c.name.common;
        optionFrom.setAttribute('value', Object.keys(c.currencies)[0] + ' ' + c.name.common);

        selectTo.appendChild(optionTo);
        selectFrom.appendChild(optionFrom);
      }
    }
  }
}