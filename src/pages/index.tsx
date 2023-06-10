import PokemonEntry from "@/components/PokemonEntry";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import * as PokemonApi from "@/network/pokemon-api";
import { Spinner, Row, Col, Button } from "react-bootstrap";

export default function Home() {
  const router = useRouter();
  const page = parseInt(router.query.page?.toString() || "1");

  const { data, isLoading } = useSWR(["getPokemonPage", page], () =>
    PokemonApi.getPokemonPage(page)
  );

  if (isLoading) {
    return <Spinner animation="border" className="d-block m-auto" />;
  }

  return (
    <div>
      <h1 className="text-center mb-4">Gotta cache &apos;em all</h1>
      <Row xs={1} sn={2} lg={3} xl={4} className="g-4">
        {data?.results.map((pokemonGot) => {
          return (
            <Col key={pokemonGot.name}>
              <PokemonEntry name={pokemonGot.name} />
            </Col>
          );
        })}
      </Row>
      <div className="d-flex justify-content-center gap-2 mt-4">
        {data?.previous && (
          <Button
            onClick={() =>
              router.push({ query: { ...router.query, page: page - 1 } })
            }
          >
            Previous Page
          </Button>
        )}
        {data?.next && (
          <Button
            onClick={() =>
              router.push({ query: { ...router.query, page: page + 1 } })
            }
          >
            Next Page
          </Button>
        )}
      </div>
    </div>
  );
}
