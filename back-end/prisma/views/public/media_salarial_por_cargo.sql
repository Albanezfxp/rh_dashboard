SELECT
  c.id AS cargo_id,
  c.nome AS cargo_nome,
  count(f.id) AS total_funcionarios,
  (avg(f.salario)) :: integer AS media_salarial
FROM
  (
    cargos c
    LEFT JOIN funcionarios f ON ((f."cargoId" = c.id))
  )
GROUP BY
  c.id,
  c.nome
ORDER BY
  ((avg(f.salario)) :: integer) DESC;