---
title: "Getting started with Finance Studio"
summary: "How to enter amounts, read the answers and their working, and take the Excel formula with you, worked through one project decision."
updated: 2026-11-27
tags: ["finance-studio", "finance", "excel"]
draft: true
---

Finance Studio is a set of calculators for the questions that come up whenever money moves over
time: what a loan costs, what savings grow to, what a share is worth, and whether a project is
worth doing. Each one shows its working and the Excel formula that gives the same answer.

## Typing amounts

Type amounts as plain positive numbers, with or without spaces between the thousands. Where the
direction matters, say which way the money goes instead of typing a minus sign: **I pay** or
**I receive** on the solver, **In** or **Out** on a row of cash flows. Rates are typed as
percentages, so 10 means 10%.

If you use a comma for decimals, pick that format under **Settings**. The boxes then read numbers
your way, and a number typed the other way is refused rather than misread.

## One decision, start to finish

Say a project costs 16 000 today and brings in 2 000, 4 000, then 5 000 a year for four years,
and money costs you 9% a year.

1. Open **Project evaluator**. Year 0 is marked **Out**: type 16000. Fill years 1 to 6.
2. Set the discount rate to 9.
3. The NPV is about 2 836. It is positive, so at 9% the project adds value.
4. The IRR is about 14.1%: the project earns more than the 9% it costs, which says the same.
5. The NPV profile shows the NPV at every rate. It crosses zero at the IRR.

If you already have the row in Excel, copy it and paste it into the year 0 box. It fills that box
and the ones after it.

## The working and the formula

Under each answer, **Show the working** opens the table behind it: each year's cash flow, its
discount factor and its value today, with running totals for the payback.

Tick **Show the Excel formula** and each answer gets the formula that produces it, with your
numbers in it, for example `=-16000+NPV(9%, {2000,4000,5000,5000,5000,5000})`. Copy it into a cell
and Excel gives the same number. Payback has no Excel function, so it points to the working
instead.

## When there is no answer

Some questions have no meaningful answer, and the calculator says why instead of showing a
number: growth at or above the required return, a payment that never covers the interest, cash
flows that all go one way. Change the input it names and the answer comes back.

## Keeping and sharing

Your last inputs stay in your browser, so they are there next time. The address bar carries the
inputs of the calculator you are on, so a copied link opens the same numbers for someone else.
