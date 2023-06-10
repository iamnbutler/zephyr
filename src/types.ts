interface Text {
    text: string
    size: number
    family: string
    color: string
}

interface Icon {
    width: number
    height: number
    color: string
}

type Border = {
    color: string
    width: number
}

type ElementType = Text | Icon

type Container = {
    width: number | "fill"
    height: number | "fill"
    padding: number
    background: string
    cornerRadius: number
    border: Border
}

type ContainedText = {
    container: Container
    text: Text
}

type ContainedIcon = {
    container: Container
    icon: Icon
}
