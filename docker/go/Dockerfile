FROM golang:1.20 AS builder

WORKDIR /usr/src/app

RUN go mod init fullcycle/go
COPY ./hello.go .

RUN go build -v -ldflags "-w" -o /usr/local/bin/fullcycle

FROM scratch

COPY --from=builder /usr/local/bin/fullcycle /

CMD ["/fullcycle"]