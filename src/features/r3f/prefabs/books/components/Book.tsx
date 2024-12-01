import { useCursor, useTexture } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useAtom } from "jotai"
import { easing } from "maath"
import type { FC } from "react"
import { useEffect, useMemo, useRef, useState } from "react"
import type { Group } from "three"
import {
  Bone,
  BoxGeometry,
  Color,
  Float32BufferAttribute,
  MathUtils,
  MeshStandardMaterial,
  Skeleton,
  SkinnedMesh,
  SRGBColorSpace,
  Uint16BufferAttribute,
  Vector3,
} from "three"
import { degToRad } from "three/src/math/MathUtils.js"
import { pageAtom, pages } from "./UI"

const easingFactor = 0.5
const easingFactorFold = 0.3
const insideCurveStrength = 0.18
const outsideCurveStrength = 0.05
const turningCurveStrength = 0.09

const PAGE_WIDTH = 1.28
const PAGE_HEIGHT = 1.71
const PAGE_DEPTH = 0.003
const PAGE_SEGMENTS = 30
const SEGMENT_WIDTH = PAGE_WIDTH / PAGE_SEGMENTS

const pageGeometry = new BoxGeometry(
  PAGE_WIDTH,
  PAGE_HEIGHT,
  PAGE_DEPTH,
  PAGE_SEGMENTS,
  2,
)

pageGeometry.translate(PAGE_WIDTH / 2, 0, 0)

const position = pageGeometry.attributes.position as Float32BufferAttribute
const vertex = new Vector3()
const skinIndexes: number[] = []
const skinWeights: number[] = []

for (let i = 0; i < position.count; i++) {
  vertex.fromBufferAttribute(position, i)
  const x = vertex.x

  const skinIndex = Math.max(0, Math.floor(x / SEGMENT_WIDTH))
  let skinWeight = (x % SEGMENT_WIDTH) / SEGMENT_WIDTH

  skinIndexes.push(skinIndex, skinIndex + 1, 0, 0)
  skinWeights.push(1 - skinWeight, skinWeight, 0, 0)
}

pageGeometry.setAttribute(
  "skinIndex",
  new Uint16BufferAttribute(skinIndexes, 4),
)
pageGeometry.setAttribute(
  "skinWeight",
  new Float32BufferAttribute(skinWeights, 4),
)

const whiteColor = new Color("white")
const emissiveColor = new Color("orange")

const pageMaterials = [
  new MeshStandardMaterial({
    color: whiteColor,
  }),
  new MeshStandardMaterial({
    color: "#111",
  }),
  new MeshStandardMaterial({
    color: whiteColor,
  }),
  new MeshStandardMaterial({
    color: whiteColor,
  }),
]

pages.forEach(page => {
  useTexture.preload(`/textures/${page.front}.jpg`)
  useTexture.preload(`/textures/${page.back}.jpg`)
  useTexture.preload(`/textures/book-cover-roughness.jpg`)
})

interface PageProps {
  number: number
  front: string
  back: string
  page: number
  opened: boolean
  bookClosed: boolean
}

const Page: FC<PageProps> = ({
  number,
  front,
  back,
  page,
  opened,
  bookClosed,
  ...props
}) => {
  const [picture, picture2, pictureRoughness] = useTexture([
    `/textures/${front}.jpg`,
    `/textures/${back}.jpg`,
    ...(number === 0 || number === pages.length - 1
      ? [`/textures/book-cover-roughness.jpg`]
      : []),
  ])

  picture.colorSpace = picture2.colorSpace = SRGBColorSpace
  const group = useRef<Group>(null)
  const turnedAt = useRef<number>(0)
  const lastOpened = useRef<boolean>(opened)

  const skinnedMeshRef = useRef<SkinnedMesh>(null)

  const manualSkinnedMesh = useMemo(() => {
    const bones: Bone[] = []
    for (let i = 0; i <= PAGE_SEGMENTS; i++) {
      const bone = new Bone()
      bones.push(bone)
      bone.position.x = i === 0 ? 0 : SEGMENT_WIDTH
      if (i > 0) {
        bones[i - 1].add(bone)
      }
    }
    const skeleton = new Skeleton(bones)

    const materials = [
      ...pageMaterials,
      new MeshStandardMaterial({
        color: whiteColor,
        map: picture,
        ...(number === 0
          ? {
              roughnessMap: pictureRoughness,
            }
          : {
              roughness: 0.1,
            }),
        emissive: emissiveColor,
        emissiveIntensity: 0,
      }),
      new MeshStandardMaterial({
        color: whiteColor,
        map: picture2,
        ...(number === pages.length - 1
          ? {
              roughnessMap: pictureRoughness,
            }
          : {
              roughness: 0.1,
            }),
        emissive: emissiveColor,
        emissiveIntensity: 0,
      }),
    ]

    const mesh = new SkinnedMesh(pageGeometry, materials)
    mesh.castShadow = true
    mesh.receiveShadow = true
    mesh.frustumCulled = false
    mesh.add(skeleton.bones[0])
    mesh.bind(skeleton)
    return mesh
  }, [picture, picture2, pictureRoughness])

  useFrame((_, delta) => {
    if (!skinnedMeshRef.current) return

    const emissiveIntensity = highlighted ? 0.22 : 0
    // @ts-ignore
    skinnedMeshRef.current.material[4].emissiveIntensity =
      // @ts-ignore
      skinnedMeshRef.current.material[5].emissiveIntensity = MathUtils.lerp(
        // @ts-ignore
        skinnedMeshRef.current.material[4].emissiveIntensity,
        emissiveIntensity,
        0.1,
      )

    if (lastOpened.current !== opened) {
      turnedAt.current = Date.now()
      lastOpened.current = opened
    }

    const turningTime = Math.min(400, Date.now() - turnedAt.current) / 400
    const targetRotation = opened ? -Math.PI / 2 : Math.PI / 2

    const bones = skinnedMeshRef.current.skeleton.bones
    bones.forEach((bone, i) => {
      // Logic for bone rotations here...
    })
  })

  const [_, setPage] = useAtom(pageAtom)
  const [highlighted, setHighlighted] = useState(false)
  useCursor(highlighted)

  return (
    <group
      {...props}
      ref={group}
      onPointerEnter={e => {
        e.stopPropagation()
        setHighlighted(true)
      }}
      onPointerLeave={e => {
        e.stopPropagation()
        setHighlighted(false)
      }}
      onClick={e => {
        e.stopPropagation()
        setPage(opened ? number : number + 1)
        setHighlighted(false)
      }}
    >
      <primitive
        object={manualSkinnedMesh}
        ref={skinnedMeshRef}
        position-z={-number * PAGE_DEPTH + page * PAGE_DEPTH}
      />
    </group>
  )
}

export const Book: FC = ({ ...props }) => {
  const [page] = useAtom(pageAtom)
  const [delayedPage, setDelayedPage] = useState(page)

  useEffect(() => {
    let timeout: number

    const goToPage = () => {
      setDelayedPage(delayedPage => {
        if (page === delayedPage) return delayedPage

        timeout = setTimeout(
          goToPage,
          Math.abs(page - delayedPage) > 2 ? 50 : 150,
        )
        return page > delayedPage ? delayedPage + 1 : delayedPage - 1
      })
    }

    goToPage()
    return () => clearTimeout(timeout)
  }, [page])

  return (
    <group {...props} rotation-y={-Math.PI / 2}>
      {[...pages].map((pageData, index) => (
        <Page
          key={index}
          page={delayedPage}
          number={index}
          opened={delayedPage > index}
          bookClosed={delayedPage === 0 || delayedPage === pages.length}
          {...pageData}
        />
      ))}
    </group>
  )
}
