import { Row, Col } from "react-bootstrap"
import storeItems from "../data/items.json"
import { StoreItem } from "../components/StoreItem"

//pull and display each item from json data file
export function Store(){
    return (
    <>
    <h1>Store</h1>
    <Row md={2} xs={1} lg={3} className="g-3">
        {storeItems.map(item => (
            <Col key={item.id}><StoreItem {...item} />
            </Col>
        ))}
    </Row>
    </>
    )
}