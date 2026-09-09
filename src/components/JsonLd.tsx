/**
 * Renders a JSON-LD block. The payload is built at build time from our own
 * data, so it never carries user input; `JSON.stringify` output is escaped so
 * a `</script>` sequence in the data cannot break out of the tag.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
