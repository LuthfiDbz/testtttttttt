import React from "react";

export const numberFormat = (number) => {
  if(number === undefined || number === null || number === '') {
    return number
  }
  const string = number.toString()
  const left = string.length % 3
  let rupiah = string.substring(0, left)
  const thousand = string.substring(left).match(/\d{3}/g)

  if(thousand) {
    const separate = left ? '.' : '';
    rupiah += separate + thousand.join('.')
  }
  return rupiah
}