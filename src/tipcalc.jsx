import dollar from '../images/icon-dollar.svg';
import person from '../images/icon-person.svg';
import { useState, useRef, useEffect } from 'react';
import Showtip from './showtip';

const tip_txt = ['5%', '10%', '15%', '25%', '50%', 'Custom'];

function Calctip() {

    const [custom, setcustom] = useState(false);
    const [bill, setbill] = useState('');
    const [ppl, setppl] = useState('');
    const [color, setcolor] = useState('5%');
    const [customValue, setcustomValue] = useState('');
    const [custm, setcustm] = useState('')

    const Bill = useRef(null);
    const btnsRef = useRef([]);
    const cusin = useRef(null);
    const Ppl = useRef(null);

    const t_amt_p = useRef(null);
    const total_p = useRef(null);



    useEffect(() => {

        const billValue = Number(bill);
        const peopleValue = Number(ppl);

        let tipPercent;

        if (custom) {
            tipPercent = Number(customValue);
        } else {
            tipPercent = Number(color.replace('%', ''));
        }

        if (
            billValue <= 0 ||
            peopleValue <= 0 ||
            tipPercent <= 0
        ) {
            if (t_amt_p.current) {
                t_amt_p.current.innerHTML = '$0.00';
            }

            if (total_p.current) {
                total_p.current.innerHTML = '$0.00';
            }

            return;
        }

        const tipAmount = (billValue * tipPercent) / 100;
        const tipPerPerson = tipAmount / peopleValue;
        const totalPerPerson =
            (billValue + tipAmount) / peopleValue;

        if (t_amt_p.current) {
            t_amt_p.current.innerHTML =
                `$${tipPerPerson.toFixed(2)}`;
        }

        if (total_p.current) {
            total_p.current.innerHTML =
                `$${totalPerPerson.toFixed(2)}`;
        }

    }, [bill, ppl, color, custom, customValue]);

    const reset = () => {

        setbill('');
        setppl('');
        setcolor('5%');
        setcustom(false);
        setcustomValue('');

        if (Bill.current) {
            Bill.current.value = '';
        }

        if (Ppl.current) {
            Ppl.current.value = '';
        }

        if (cusin.current) {
            cusin.current.value = '';
        }

        if (t_amt_p.current) {
            t_amt_p.current.innerHTML = '$0.00';
        }

        if (total_p.current) {
            total_p.current.innerHTML = '$0.00';
        }
    };

    const resetDisabled =
        !bill ||
        Number(bill) <= 0 ||
        !ppl ||
        Number(ppl) <= 0 ||
        (custom && (
            !customValue ||
            Number(customValue) <= 0
        ));

    return (
        <>
            <div className="calculate-tip">

                <section className="bill">
                    <span>bill</span>

                    <div className="binput">
                        <input
                            name="bill"
                            className="bill"
                            type="number"
                            inputMode="numeric"
                            placeholder="0"
                            ref={Bill}
                            step="any"
                            onChange={e => setbill(e.target.value)}
                            style={{
                                color: bill === '' ? 'hsl(184, 14%, 56%)' : 'hsl(183, 100%, 15%)'
                            }}
                            onInput={e => {
                                e.target.value =
                                    e.target.value.slice(0, 10);
                            }}
                            maxLength="10"
                        />

                        <img
                            src={dollar}
                            alt="dollar-image"
                            className="doller"
                        />
                    </div>
                </section>

                <section className="tip-btn">
                    <span>Select Tip %</span>

                    <div className="btns">

                        {tip_txt.map((tips, index) =>
                            index === 5 && custom ? (

                                <input
                                    type="number"
                                    inputMode="numeric"
                                    name="custom"
                                    key={tips}
                                    ref={cusin}
                                    className="cusin"
                                    min="0"
                                    placeholder="0"
                                    autoFocus
                                    onChange={e => setcustm(e.target.value)}
                                    style={{
                                        color: custm === '' ? 'hsl(184, 14%, 56%)' : 'hsl(183, 100%, 15%)'
                                    }}

                                    onKeyDown={e => {
                                        if (
                                            e.key === '.' ||
                                            e.key === ','
                                        ) {
                                            e.preventDefault();
                                        }
                                    }}

                                    onInput={e => {
                                        e.target.value =
                                            e.target.value.slice(0, 3);

                                        setcustomValue(
                                            e.target.value
                                        );
                                    }}
                                />

                            ) : (

                                <button
                                    className={`btn${index + 1}`}
                                    key={tips}

                                    ref={el => {
                                        btnsRef.current[index] = el;
                                    }}

                                    style={{
                                        color:
                                            color === tips
                                                ? 'hsl(183, 100%, 15%)'
                                                : 'hsl(0, 100%, 100%)',

                                        backgroundColor:
                                            color === tips
                                                ? 'hsl(172, 67%, 45%)'
                                                : 'hsl(183, 100%, 15%)'
                                    }}

                                    onClick={() => {

                                        setcolor(tips);

                                        if (index === 5) {
                                            setcustom(true);
                                        } else {
                                            setcustom(false);
                                            setcustomValue('');
                                        }
                                    }}
                                >
                                    {tips}
                                </button>

                            )
                        )}

                    </div>
                </section>

                <section className="people">
                    <div className="zero">
                        <span>number of people</span>

                        {bill !== '' && ppl === '' && (
                            <span id='warning'>Can't be zero</span>
                        )}
                    </div>

                    <div className="pinput">

                        <input
                            name="numberpple"
                            type="number"
                            className="ppl"
                            value={ppl}
                            ref={Ppl}
                            onChange={e =>
                                setppl(e.target.value)
                            }
                            style={{
                                color: ppl === '' ? 'hsl(184, 14%, 56%)' : 'hsl(183, 100%, 15%)',

                                outline:
                                    bill !== '' && ppl === ''
                                        ? '2px solid red'
                                        : 'none'
                            }}
                            onKeyDown={e => {
                                if (
                                    e.key === '.' ||
                                    e.key === ','
                                ) {
                                    e.preventDefault();
                                }
                            }}

                            onInput={e => {
                                e.target.value =
                                    e.target.value.slice(0, 4);

                            }}

                            placeholder="0"
                            inputMode="numeric"
                            maxLength="2"
                            min="0"
                        />

                        <img
                            src={person}
                            alt="person-image"
                            className="person"
                        />

                    </div>
                </section>

            </div>

            <Showtip
                t_amt_p={t_amt_p}
                total_p={total_p}
                reset={reset}
                resetDisabled={resetDisabled}
            />
        </>
    );
}

export default Calctip;