class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) { /*recebe dois parâmetros */
        const produtos = {
            "cafe": 3.00,
            "chantily": 1.50,
            "suco": 6.20,
            "sanduiche": 6.50,
            "queijo": 2.00,
            "salgado": 7.25,
            "combo1": 9.50,
            "combo2": 7.50
        };

        const formaDePagamento = ["dinheiro", "debito", "credito"]; /*ARRAY: formaDePagamento[0] dinheiro - formaDePagamento[1] debito  - formaDePagamento[2] credito*/

        if (!formaDePagamento.includes(metodoDePagamento)) { /*checa se o metodoDePagamento informado está no array TRUE: INVALIDO*/
            return "Forma de pagamento inválida!";
        }

        if (itens.length == 0) {
            return "Não há itens no carrinho de compra!"
        }

        let valorTotal = 0; /*inicializo soma dos valores */

        const pedidos = [];
        for (const itemInfo of itens) {
            itemInfo.replace(" ", "");
            const [codigo, quantidade] = itemInfo.split(",");
            pedidos.push({ codigo, quantidade });
        }

        for (const itemPedido of pedidos) { /*loop que passa pelo array */
            if (!produtos.hasOwnProperty(itemPedido.codigo)) {
                return "Item inválido!" /*procura o código nos produtos*/
            }

            if (itemPedido.quantidade < 1) {
                return "Quantidade inválida!"
            }

            if (itemPedido.codigo === "chantily" && !pedidos.some(item => item.codigo === "cafe")) { /*verifica se quando pede chantily também pede cafe*/
                return "Item extra não pode ser pedido sem o principal"
            }

            if (itemPedido.codigo === "queijo" && !pedidos.some(item => item.codigo === "sanduiche")) { /*verifica se quando pede queijo também pede sanduiche*/
                return "Item extra não pode ser pedido sem o principal"
            }

            let valorItem = produtos[itemPedido.codigo] * parseInt(itemPedido.quantidade);
            valorTotal += valorItem;
        }

        if (metodoDePagamento === "dinheiro") {
            valorTotal *= 0.95; /*paga 95% do valor total*/
        } else if (metodoDePagamento === "credito") {
            valorTotal *= 1.03; /*paga 103% do valor total */
        }

        return `R$ ${valorTotal.toFixed(2).replace(".", ",")}`;
    }

}

export { CaixaDaLanchonete };