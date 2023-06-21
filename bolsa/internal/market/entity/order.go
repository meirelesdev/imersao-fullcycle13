package entity

type Order struct {
	ID            string `json:"id"`
	Investor      *Investor
	Asset         *Asset
	Shares        int `json:"shares"`
	PendingShares int `json:"pending_shares"`
	Price         float64
	OrderType     string `json:"order_type"`
	Status        string `json:"status"`
	Transactions  []*Transaction
}

func NewOrder(orderID string, investor *Investor, asset *Asset, shares int, price float64, orderType string) *Order {
	return &Order{
		ID:            orderID,
		Investor:      investor,
		Asset:         asset,
		Shares:        shares,
		PendingShares: shares,
		Price:         price,
		OrderType:     orderType,
		Status:        "OPEN",
		Transactions:  []*Transaction{},
	}
}
